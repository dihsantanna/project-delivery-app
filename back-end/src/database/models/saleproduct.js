module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsToMany(models.Product,
      { through: 'SaleProduct', foreignKey: 'id', as: 'productId' }
      );

    SaleProduct.belongsToMany(models.Sale,
      { through: 'SaleProduct', foreignKey: 'id', as: 'saleId' }
      );
  }

  return SaleProduct;
};
