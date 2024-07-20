const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { sequelize, message:Message, individualMessage:IndividualMessage, groupMembers:GroupMembership } = require('../config/database');
const messageRoutes = require('../routes/messageRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/messages', messageRoutes);

jest.mock('../config/database', () => ({
  message: {
    findAll: jest.fn()
  },
  individualMessage: {
    findAll: jest.fn()
  },
  groupMembers: {
    findOne: jest.fn()
  },
  sequelize: {
    sync: jest.fn(),
    close: jest.fn()
  }
}));

const generateToken = (id) => {
  return jwt.sign({ id, username: `user${id}` }, process.env.ACCESS_TOKEN_SECRET);
};

const authToken = generateToken(1);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Message Controller', () => {
  describe('getMessages', () => {
    it('should return messages for a valid group membership', async () => {
      GroupMembership.findOne.mockResolvedValue({ groupId: 1, userId: 1 });
      Message.findAll.mockResolvedValue([{ id: 1, content: 'Test message', groupId: 1, userId: 1 }]);

      const response = await request(app)
        .get('/api/messages/1')
        .set('Authorization', `${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, content: 'Test message', groupId: 1, userId: 1 }]);
    }, 10000);

    it('should return 403 if user is not a member of the group', async () => {
      GroupMembership.findOne.mockResolvedValue(null);

      const response = await request(app)
        .get('/api/messages/1')
        .set('Authorization', `${authToken}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBe('You are not allowed to see this group message');
    });

    it('should return 500 if there is a server error', async () => {
      GroupMembership.findOne.mockRejectedValue(new Error('Server error'));

      const response = await request(app)
        .get('/api/messages/1')
        .set('Authorization', `${authToken}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to retrieve messages');
    }, 10000);
  });

  describe('getIndividualMessages', () => {
    it('should return individual messages between two users', async () => {
      IndividualMessage.findAll.mockResolvedValue([
        { id: 1, content: 'Hello', senderId: 1, receiverId: 2 },
        { id: 2, content: 'Hi', senderId: 2, receiverId: 1 }
      ]);

      const response = await request(app)
        .get('/api/messages/individual/2')
        .set('Authorization', `${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, content: 'Hello', senderId: 1, receiverId: 2 },
        { id: 2, content: 'Hi', senderId: 2, receiverId: 1 }
      ]);
    });

    it('should return 500 if there is a server error', async () => {
      IndividualMessage.findAll.mockRejectedValue(new Error('Server error'));

      const response = await request(app)
        .get('/api/messages/individual/2')
        .set('Authorization', `${authToken}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to retrieve individual messages');
    });
  });
});
