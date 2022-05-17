const { StatusCodes } = require('http-status-codes');

const sellersMock = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  }
];

const sellersServicesMock = {
  code: StatusCodes.OK,
  message: sellersMock,
};

module.exports = {
  sellersMock,
  sellersServicesMock,
};
