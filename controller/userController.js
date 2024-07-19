process.loadEnvFile();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user: User } = require('../config/database');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password.toString());
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in' });
  }
};
