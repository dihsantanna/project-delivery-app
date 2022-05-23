const loginService = require('../services/login.services');

const login = async (req, res) => {
  const { body } = req;
  const { code, message } = await loginService.login(body);
  return res.status(code).json(message);
};

module.exports = login;
