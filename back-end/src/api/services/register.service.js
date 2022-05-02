const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { readFileSync } = require('fs');
const schemaRegister = require('../middlewares/register.validate');
const { StatusCodes: Code } = require('http-status-codes');
const { User } = require('../../database/models');

const secret = readFileSync('jwt.evaluation.key', 'utf8');

const createUser = async (data) => {
  try {
    const { error } = schemaRegister.validate(data);
    if (error) return { status: Code.BAD_REQUEST, message: error.details[0].message };
    const { name, email, password } = data;
    const userEmailExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ name });
    if (userEmailExists || userNameExists) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'Email or name already exists',
      };
    }
    const hash = md5(password);
    const user = await User.create({ name, email, password: hash });
    return { code: Code.OK, message: { ...user, token: jwt.sign(user, secret) } };
  } catch {
    return { status: Code.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
  }
};

module.exports = {
  createUser,
}