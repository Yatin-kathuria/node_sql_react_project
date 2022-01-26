const User = require('../models/users.model');

exports.allUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
      return;
    }

    res.json(users.map(({ password, numbers, ...user }) => user));
  });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
      return;
    }

    if (!result) {
      res.status(400).json({ message: 'Invalid User id' });
      return;
    }

    const { password, ...user } = result;
    res.json(user);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.delete(id, (err, result) => {
    if (err) {
      if (err.kind == 'not_found') {
        res.status(400).json({ message: 'Invalid User id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
      return;
    }

    res.json(result);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  User.updateById(id, req.body, (err, result) => {
    if (err) {
      if (err.kind == 'not_found') {
        res.status(400).json({ message: 'Invalid User id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
      return;
    }

    res.json(result);
  });
};

exports.setNumbers = (req, res) => {
  const { id } = req.params;
  const { numbers } = req.body;

  if (numbers.length != 5) {
    res.status(400).json({ message: 'Total 5 Numbers are required' });
    return;
  }

  for (let n of numbers) {
    if (isNaN(n)) {
      res.status(400).json({ message: 'Only numbers are reuired' });
      return;
    }
  }

  User.setNumbers(id, JSON.stringify(numbers), (err, result) => {
    if (err) {
      if (err.kind == 'not_found') {
        res.status(400).json({ message: 'Invalid User id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
      return;
    }

    res.json(result);
  });
};

exports.calculations = (req, res) => {
  const { id } = req.params;

  User.getNumbers(id, (err, result) => {
    if (err) {
      if (err.kind == 'not_found') {
        res.status(400).json({ message: 'Invalid User id' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
      return;
    }

    if (!result) {
      res.status(400).json({
        message: 'Please Set numbers first before doing calculations',
      });
      return;
    }

    let max = result[0];
    let min = result[0];
    let sum = 0;

    for (const n of result) {
      max = Math.max(max, n);
      min = Math.min(min, n);
      sum += n;
    }

    const calc = {
      average: sum / result.length,
      min,
      max,
    };

    res.json(calc);
  });
};
