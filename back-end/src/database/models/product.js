module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    url_image: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct,
      { foreignKey: 'product_id', as: 'product_sale' }
      );
  }
  return Product;
};
