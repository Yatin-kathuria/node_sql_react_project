const { requireLogin } = require('../middlewares');

module.exports = (app) => {
  const user = require('../controllers/user.controller');

  const router = require('express').Router();

  // list of users
  router.get('/', requireLogin, user.allUsers);

  // single user
  router.get('/:id', requireLogin, user.getUser);

  // delete user
  router.delete('/:id', requireLogin, user.deleteUser);

  // update user
  router.post('/:id', requireLogin, user.updateUser);

  // post numbers
  router.post('/numbers/:id', requireLogin, user.setNumbers);

  // calculation of numbers
  router.get('/calculation/:id', requireLogin, user.calculations);

  app.use('/api/users', router);
};
