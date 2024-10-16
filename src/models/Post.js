const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Post = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    })
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
    })
  }

  return Post
}
