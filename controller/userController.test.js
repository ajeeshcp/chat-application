const request = require('supertest');
const express = require('express');
const { sequelize, user:User } = require('../config/database');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User Registration', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');

    const user = await User.findOne({ where: { username: 'testuser' } });
    expect(user).not.toBeNull();
    expect(user.username).toBe('testuser');
  });

  it('should return 500 if user registration fails', async () => {
    jest.spyOn(User, 'create').mockImplementation(() => {
      throw new Error('Failed to register user');
    });

    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser2',
        password: 'password123'
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to register user');
  });
});
