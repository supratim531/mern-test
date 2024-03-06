module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  }
};
