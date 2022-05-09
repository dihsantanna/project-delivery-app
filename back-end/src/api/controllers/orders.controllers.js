const ordersServices = require('../services/orders.services');

const create = async (req, res) => {
  const { code, message } = await ordersServices.create(req.body);
  return res.status(code).json(message);
};

module.exports = {
  create,
};