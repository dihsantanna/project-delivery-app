module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'users',
  })

  User.associate = (models) => {
    User.hasMany(models.Sale,
      { foreignKey: 'user_id', as: 'user_sale' }
      )

    User.hasMany(models.Sale,
      { foreignKey: 'seller_id', as: 'user_seller' }
      )
  }

  return User;
};
