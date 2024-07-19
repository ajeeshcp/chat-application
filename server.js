const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { sequelize } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');
const contactRoutes = require('./routes/contactsRouter');
const authenticateToken = require('./middleware/auth');
const { message:Message, individualMessage:IndividualMessage } = require('./config/database');
const { join } = require('node:path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/groups', authenticateToken, groupRoutes);
app.use('/api/messages', authenticateToken, messageRoutes);
app.use('/api/contacts', authenticateToken, contactRoutes);

io.on('connection', (socket) => {
  console.log('New connection...');

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group ${groupId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { groupId, userId, content } = data;
    try {
      const message = await Message.create({ groupId, userId, content, createdAt: new Date() });
      io.to(groupId).emit('message', message); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('sendIndividualMessage', async (data) => {
    const { senderId, receiverId, content } = data;
    try {
      const message = await IndividualMessage.create({ senderId, recieverId: receiverId, content, createdAt: new Date() });
      io.to(receiverId).emit('individualMessage', message); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User left from chat...');
  });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
});

sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
