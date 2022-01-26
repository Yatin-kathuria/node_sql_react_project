const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '37984685d88ac31ee91c562000a3c14fe27af5213a5b4581541515e';

class HashService {
  createToken(information) {
    return jwt.sign(information, JWT_SECRET);
  }

  verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }

  async encryptPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  async decryptPassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = new HashService();
