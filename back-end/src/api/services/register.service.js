const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { readFileSync } = require('fs');
const { StatusCodes: Code } = require('http-status-codes');
const { User } = require('../../database/models');

const secret = readFileSync('jwt.evaluation.key', 'utf8');

const createUser = async (data) => {
  try {
    const { name, email, password } = data;
    const hash = md5(password);
    const userEmailExists = await User.findOne({ where: { email } });
    const userNameExists = await User.findOne({ where: { name } });
    if (userEmailExists || userNameExists) {
      return {
        code: 409,
        message: 'Email or name already exists',
      };
    }
    const role = 'customer';
    const token = jwt.sign({ name, email, role }, secret, { expiresIn: '1d' });
    const user = await User.create({ name, email, password: hash, role });
    const newUser = { code: Code.CREATED, message: { user, token } };
    return newUser;
  } catch (error) {
    return { code: Code.INTERNAL_SERVER_ERROR, message: error.message };
  }
};

module.exports = {
  createUser,
}