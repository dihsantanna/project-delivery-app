const sellersServices = require('../services/sellers.services');

const findAll = async (_req, res) => {
  const { code, message } = await sellersServices.findAll();
  return res.status(code).json(message);
};

module.exports = {
  findAll,
};