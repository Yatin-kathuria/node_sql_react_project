module.exports = (app) => {
  const auth = require('../controllers/auth.controller');

  var router = require('express').Router();

  // register a user
  router.post('/register', auth.register);

  // login a user
  router.post('/login', auth.login);

  // // Retrieve all Tutorials
  // router.get('/', tutorials.findAll);

  // // Retrieve all published Tutorials
  // router.get('/published', tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get('/:id', tutorials.findOne);

  // // Update a Tutorial with id
  // router.put('/:id', tutorials.update);

  // // Delete a Tutorial with id
  // router.delete('/:id', tutorials.delete);

  // // Delete all Tutorials
  // router.delete('/', tutorials.deleteAll);

  app.use('/api/auth', router);
};
