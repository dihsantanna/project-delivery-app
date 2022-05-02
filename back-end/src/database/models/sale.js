exports.Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    delivery_adress: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' }
    );
  }

  return Sale;
};
