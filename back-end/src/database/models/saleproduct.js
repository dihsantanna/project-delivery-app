module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'salesProducts',
    timestamps: false,
    underscored: true,
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Product,
      { foreignKey: 'product_id', as: 'product_sale' }
      );

    SaleProduct.belongsTo(models.Sale,
      { foreignKey: 'sale_id', as: 'sale_product' }
      );
  }

  return SaleProduct;
};
