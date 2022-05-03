const { StatusCodes: code } = require('http-status-codes');
const { User } = require('../../database/models');

const getAll = async () => {
  const users = await User.findAll();
  return { code: code.OK, message: users };
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return { code: code.OK, message: user };
};

module.exports = {
  getAll,
  getById,
};