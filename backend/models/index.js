const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
      freezeTableName: true
    },
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

sequelize.authenticate().then(() => {
  console.log("Database connected");
}).catch(err => {
  console.log("Database connection error:", err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.login = require("./loginModel")(sequelize, DataTypes);
db.employee = require("./employeeModel")(sequelize, DataTypes);

db.sequelize.sync({
  force: false
}).then(() => {
  console.log("re-sync done");
});

module.exports = db;
