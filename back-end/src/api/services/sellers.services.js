const { StatusCodes: code } = require('http-status-codes');
const { User } = require('../../database/models');

const findAll = async () => {
  try {
    const users = await User.findAll();
    const sellers = users.filter((user) => user.role === 'seller');
    return { code: code.OK, message: sellers };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  findAll,
};