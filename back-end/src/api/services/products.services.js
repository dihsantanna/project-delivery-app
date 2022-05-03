const { StatusCodes: code } = require('http-status-codes');
const { User } = require('../../database/models');

const getAll = async () => {
  try {
  const users = await User.findAll();
  return { code: code.OK, message: users };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

const getById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    return { code: code.OK, message: user };
  } catch (error) {
    return { code: code.NOT_FOUND, message: error };
  }
};

module.exports = {
  getAll,
  getById,
};