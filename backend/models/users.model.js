const sql = require('../db');

/*
Schema

CREATE TABLE users(  
    id int NOT NULL AUTO_INCREMENT,  
    name varchar(45) NOT NULL,
    email varchar(45) NOT NULL unique,
    password LONGTEXT NOT NULL,
    age int,  
    PRIMARY KEY (id)  
);
**/

class User {
  create(newUser, result) {
    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('created user: ', { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  }

  findByEmail(email, result) {
    sql.query(`SELECT * FROM users WHERE email = ?`, email, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found user with the email
      result({ kind: 'not_found' }, null);
    });
  }

  findById(id, result) {
    sql.query(`SELECT * FROM users WHERE id = ?`, id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found user with the id
      result(null, null);
    });
  }

  getAll(result) {
    sql.query(`SELECT * FROM users`, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      // all users
      result(null, res);
    });
  }

  delete(id, result) {
    sql.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('deleted tutorial with id: ', id);
      result(null, res);
    });
  }

  updateById(id, user, result) {
    sql.query(
      'UPDATE users SET name = ?, age = ? WHERE id = ?',
      [user.name, user.age, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: 'not_found' }, null);
          return;
        }

        console.log('updated User: ', { id: id, ...user });
        result(null, { id, ...user });
      }
    );
  }

  setNumbers(id, numbers, result) {
    sql.query(
      'UPDATE users SET numbers = ? WHERE id = ?',
      [numbers, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: 'not_found' }, null);
          return;
        }

        result(null, { id, ...res, numbers });
      }
    );
  }

  getNumbers(id, result) {
    sql.query('Select numbers from users WHERE id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.length > 0) {
        // not found User with the id
        result(null, res[0].numbers);
        return;
      }

      result({ kind: 'not_found' }, null);
    });
  }
}

module.exports = new User();
