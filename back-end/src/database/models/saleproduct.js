exports.SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsMany(models.Product,
      { foreignKey: 'id', as: 'productId' }
      );

    SaleProduct.belongsMany(models.Sale,
      { foreignKey: 'id', as: 'saleId' }
      );
  }

  return SaleProduct;
};
