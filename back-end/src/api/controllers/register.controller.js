const loginService = require('../services/register.service');

const createUser = async (data) => {
  const { body } = data;
  const { code, message } = await loginService.createUser(body);
  return res.status(code).json(message);
};

module.exports = {
  createUser,
}