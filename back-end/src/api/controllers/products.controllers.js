const productsServices = require('../services/products.services');

const getAll = async (req, res) => {
  const { code, message } = await productsServices.getAll();
  return res.status(code).json(message);
};

const getById = async (req, res) => {
  const { code, message } = await productsServices.getById(req.params.id);
  return res.status(code).json(message);
};

module.exports = {
  getAll,
  getById,
};