const { Sequelize } = require('sequelize')
const config = require('../config/config')

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: console.log,
  }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('../src/models/User')(sequelize, Sequelize.DataTypes)
db.Post = require('../src/models/Post')(sequelize, Sequelize.DataTypes)
db.Comment = require('../src/models/Comment')(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = db
