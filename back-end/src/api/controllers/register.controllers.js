const registerService = require('../services/register.services');

const createUser = async (req, res) => {
  const { body } = req;
  const { code, message } = await registerService.createUser(body);

  return res.status(code).json(message);
};

module.exports = createUser;
