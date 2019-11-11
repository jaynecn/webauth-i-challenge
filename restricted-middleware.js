const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

module.export = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
        // with valid credentials, call next
        next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials '})
        }
    })
    .catch(error => {
      res.status(500).json(error.message);
    })
  } else {
    res.status(400).json({ message: 'Please provide valide credentials '});
  }
}