const { StatusCodes: code } = require('http-status-codes');
const { Sale } = require('../../database/models');
const { SalesProducts } = require('../../database/models');

const salesToPost = (saleId, products) => {
  const result = products.map((product) => ({
    saleId,
    productId: product.id,
    quantity: product.quantity,
  }));
  return result;
};

const create = async (data) => {
  const saleData = {
    userId: data.userId,
    sellerId: data.sellerId,
    totalPrice: data.totalPrice,
    deliveryAddress: data.deliveryAddress,
    deliveryNumber: data.deliveryNumber,
    saleDate: data.saleDate,
    status: data.status,
  };
  try {
    const sale = await Sale.create(saleData);
    const saleProducts = salesToPost(sale.id, data.products);
    await SalesProducts.bulkCreate(saleProducts);
    return { code: code.CREATED, message: sale };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  create,
};