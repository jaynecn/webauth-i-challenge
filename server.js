const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

// imports

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/user-router');

//instantiate
const server = express();

// session config
const sessionConfig = {
  name: 'chicos cookie',
  secret: 'chico is a cat and he likes bacon',
  cookie: {
    maxAge: 1000 * 60 * 30, // you need it if the cookie is to survive!
    secure: false, // should be true in production
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
  // add Knex Session Store
  store: new KnexSessionStore({
    knex: require('./data/dbConfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

// plug middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


// catch-all endpoint
server.get('*', handleDefault)
function handleDefault(req, res) {
  res.json({ message: 'hello from WebAuthI Challenge with Jayne'})
}

module.exports = server;