const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    })
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
    })
  }

  return User
}
