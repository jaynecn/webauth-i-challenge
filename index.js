const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// imports
const db = require('./data/dbConfig');
const Users = require('./users/users-model');
const restricted = require('./restricted-middleware');

//instantiate
const app = express();

// plug middleware
app.use(cors());
app.use(express.json());

// POST REQUESTS
app.post('/api/register', (req, res) => {
  let user = req.body;

  // create hash by capturing user password & initialising hashSync
  const hash = bcrypt.hashSync(user.password, 12);

  // override the users password with the new hash
  const newUser = {
    username: req.body.username,
    password: hash,
  }
  
  Users.add(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'user not created ' + error.message})
    })
})

app.post('/api/login', restricted, (req, res) => {
   Users.find()
    .then(user => {
      res.status(200).json({ message: `Welcome ${req.headers.username}!`});
    })
    .catch(error => {
      res.json({ message: 'login error ' + error.message });
    })
})


// catch-all endpoint
app.get('*', handleDefault)
function handleDefault(req, res) {
  res.json({ message: 'hello from WebAuthI Challenge with Jayne'})
}

// listen
app.listen(process.env.PORT || 4500, () => {
  console.log('listening on the server ' + (process.env.PORT || 4500 ));
})

