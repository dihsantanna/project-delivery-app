const salesServices = require('../services/sales.services');

const create = async (req, res) => {
  const { code, message } = await salesServices.create(req.body);
  return res.status(code).json(message);
};

const getByQuery = async (req, res) => {
  const { query } = req;
  const { code, message } = await salesServices.getByQuery(query);
  return res.status(code).json(message);
};

const getById = async (req, res) => {
  const { code, message } = await salesServices.getById(req.params.id);
  return res.status(code).json(message);
};

const updateStatus = async (req, res) => {
  const { code, message } = await salesServices.updateStatus(req.params.id, req.body.status);
  return res.status(code).json(message);
};

module.exports = {
  create,
  getByQuery,
  getById,
  updateStatus,
};