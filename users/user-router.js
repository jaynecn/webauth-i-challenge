const router = require('express').Router();

const Users = require('./user-model');

// middleware
const restricted = require('../auth/restricted-middleware');

// GET request
router.get('/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json({ message: 'Cannot fetch users ' + error.message });
    })
})

module.exports = router;