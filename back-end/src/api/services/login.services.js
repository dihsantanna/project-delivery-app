const jwt = require('jsonwebtoken');
const { StatusCodes: code } = require('http-status-codes');
const { readFileSync } = require('fs');
const md5 = require('md5');
const { User } = require('../../database/models');

const secret = readFileSync('jwt.evaluation.key', 'utf8');

const login = async ({ email, password }) => {
  const hash = md5(password);
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { code: code.NOT_FOUND, message: { message: 'Email not registered.' } };
  }
  if (user.password !== hash) {
    return { code: code.UNAUTHORIZED, message: { message: 'Invalid password.' } };
  }

  const response = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { code: code.OK, message: { ...response, token: jwt.sign(response, secret) } };
};

module.exports = login;