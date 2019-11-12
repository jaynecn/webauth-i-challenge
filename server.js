const express = require('express');
const cors = require('cors');

// imports

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/user-router');

//instantiate
const server = express();

// plug middleware
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


// catch-all endpoint
server.get('*', handleDefault)
function handleDefault(req, res) {
  res.json({ message: 'hello from WebAuthI Challenge with Jayne'})
}

module.exports = server;