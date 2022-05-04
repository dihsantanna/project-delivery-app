const sellersServices = require('../services/sellers.services');

const getAll = async (_req, res) => {
  const { code, message } = await sellersServices.getAll();
  return res.status(code).json(message);
};

module.exports = {
  getAll,
};