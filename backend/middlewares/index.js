const User = require('../models/users.model');
const hashService = require('../services/hashService');

exports.requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: 'you must be logged in' });
    return;
  }
  const token = authorization.split(' ')[1];
  let verified;
  try {
    verified = hashService.verifyToken(token);
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' });
    return;
  }

  if (!verified) {
    res.status(401).json({ error: 'Invalid Token' });
    return;
  }
  User.findById(verified.id, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Something went wrong' });
      return;
    }

    req.user = user;
    next();
  });
};
