CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  createdBy INT REFERENCES users(id)
);

CREATE TABLE group_members (
  userId INT REFERENCES users(id),
  groupId INT REFERENCES groups(id),
  isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  userId INT REFERENCES users(id),
  groupId INT REFERENCES groups(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE individual_messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  senderId INT REFERENCES users(id),
  receiverId INT REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
