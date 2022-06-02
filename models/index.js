const dbConfig = require("../config/database");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

exports.dbConn = {
  Sequelize,
  sequelize,
  tutorials: require("./tutorials.js")(sequelize, Sequelize),
  users: require("./users.js")(sequelize, Sequelize),
};
