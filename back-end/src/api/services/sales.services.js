const { StatusCodes: code } = require('http-status-codes');
const { Sale, SaleProduct, Product, User } = require('../../database/models');

const salesToPost = (saleId, products) => {
  const result = products.map((product) => ({
    saleId,
    productId: product.productId,
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
    status: data.status,
  };
  try {
    const sale = await Sale.create(saleData, { raw: true });
    const saleProducts = salesToPost(sale.id, data.products);
    await SaleProduct.bulkCreate(saleProducts);
    return { code: code.CREATED, message: sale };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

const getById = async (id) => {
  try {
    const sales = await Sale.findAll({
      where: { id },
      include: [{ model: SaleProduct, as: 'sale_products' }],
    });
    return { code: code.OK, message: sales };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

const getAllByUserId = async (userId) => {
  try {
    const sales = await Sale.findAll({
      where: { userId },
      include: [
        { model: User, as: 'user_sale', attributes: ['name'] },
        {
          model: SaleProduct,
          as: 'sale_products',
          include: [{ model: Product, as: 'product_sale', attributes: ['name', 'price'] }],
        },
      ],
    });
    return { code: code.OK, message: sales };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

const getAllBySelerId = async (sellerId) => {
  try {
    const sales = await Sale.findAll({
      where: { sellerId },
      include: [
        { model: User, as: 'seller_sale', attributes: ['name'] },
        {
          model: SaleProduct,
          as: 'sale_products',
          include: [{ model: Product, as: 'product_sale' }],
        },
      ],
    });
    return { code: code.OK, message: sales };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

const getByQuery = async (query) => {
  if (query.userId) {
    return getAllByUserId(query.userId);
  }
  if (query.sellerId) {
    return getAllBySelerId(query.sellerId);
  }
};

const updateStatus = async (id, status) => {
  try {
    const sale = await Sale.findOne({ where: { id } });
    if (!sale) {
      return { code: code.NOT_FOUND, message: 'Sale not found' };
    }
    const updatedSale = await sale.update({ status });
    return { code: code.OK, message: updatedSale };
  } catch (error) {
    return { code: code.INTERNAL_SERVER_ERROR, message: error };
  }
};

module.exports = {
  create,
  getByQuery,
  getById,
  updateStatus,
};