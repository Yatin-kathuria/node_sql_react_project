const User = require('../models/users.model');
const hashService = require('../services/hashService');
const { validateEmail } = require('../utils');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'All Fields are mandatory' });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Invalid Email' });
    return;
  }

  User.findByEmail(email, async (err, user) => {
    if (err) {
      if (err.kind !== 'not_found') {
        res.status(500).send({
          message: 'Internal Server Error',
        });
        return;
      }
    }

    if (user) {
      res.status(400).send({
        message: 'Email already exists.',
      });
      return;
    }

    try {
      const hashPassword = await hashService.encryptPassword(password);
      User.create({ name, email, password: hashPassword }, (err, user) => {
        if (err) {
          res.status(500).send({
            message: 'Internal Server Error',
          });
          return;
        }

        const { password, ...userDetails } = user;
        res.json({ message: 'User create succesuffuly.', user: userDetails });
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'All Fields are mandatory' });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Invalid Email' });
    return;
  }

  User.findByEmail(email, async (err, user) => {
    if (err) {
      if (err.kind == 'not_found') {
        res.status(400).send({
          message:
            'User is not exist with this Email. Please register yourself first',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Found.' });
      }
      return;
    }

    if (user) {
      const isPasswordMatch = await hashService.decryptPassword(
        password,
        user.password
      );
      if (!isPasswordMatch) {
        res.status(400).send({ message: 'Email or Password is incorrect' });
        return;
      }

      const token = hashService.createToken({ id: user.id });
      const { password: userPassword, ...userDetails } = user;
      res.json({ message: 'Succesfully login', user: userDetails, token });
    }
  });
};
