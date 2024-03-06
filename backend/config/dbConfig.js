module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "mern_test",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  }
};
