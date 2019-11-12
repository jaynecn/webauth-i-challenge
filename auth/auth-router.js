const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

const restricted = require('./restricted-middleware');




// POST REQUESTS
router.post('/register', (req, res) => {
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

router.post('/login', restricted, (req, res) => {
   Users.find()
    .then(user => {
      res.status(200).json({ message: `Welcome ${req.headers.username}!`});
    })
    .catch(error => {
      res.json({ message: 'login error ' + error.message });
    })
})

module.exports = router;