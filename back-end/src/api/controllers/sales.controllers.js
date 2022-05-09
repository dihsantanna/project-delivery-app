const salesServices = require('../services/sales.services');

const create = async (req, res) => {
  const { code, message } = await salesServices.create(req.body);
  return res.status(code).json(message);
};

module.exports = {
  create,
};