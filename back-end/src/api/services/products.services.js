const { StatusCodes: code } = require('http-status-codes');
const { Product } = require('../../database/models');

const getAll = async () => {
  try {
  const products = await Product.findAll();
  return { code: code.OK, message: products };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

const getById = async (id) => {
  try {
    const product = await Product.findOne({ where: { id } });
    return { code: code.OK, message: product };
  } catch (error) {
    return { code: code.NOT_FOUND, message: error };
  }
};

module.exports = {
  getAll,
  getById,
};