const bcrypt = require('bcryptjs');

const Users = require('./users/users-model');

module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
        // with valid credentials, call next
        next();
        } else {
          res.status(401).json({ message: 'YOU SHALL NOT PASS!! '})
        }
    })
    .catch(error => {
      res.status(500).json(error.message);
    })
  } else {
    res.status(400).json({ message: 'You shall not pass!!'});
  }
}