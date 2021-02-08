const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');


// LOGOUT
router.get('/logout', (req, res) => {
  if (req.session) {
    // using req.session in here
    // req.session.destroy
    req.session.destroy(error => {
      if(error) {
        res.json('you cannot leave ' + error.message);
      } else {
        res.json('goodbye');
      }
    })
  } else {
    res.end();
  }
})

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

router.post('/login', (req, res) => {
  let { username, password } = req.body;

   Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${req.body.username}!`});
    } else {
      res.status(401).json({ message: 'Invalid Credentials'});
    }
  })  
    .catch(error => {
      res.json({ message: 'login error ' + error.message });
    })
})

module.exports = router;