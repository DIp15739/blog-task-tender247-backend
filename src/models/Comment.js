const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Comment = sequelize.define('comments', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    })
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return Comment
}
