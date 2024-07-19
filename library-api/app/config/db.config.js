module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: "mysql",
  dialectOptions: {
      charset: "utf8mb4",
  },
  define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
  },
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
};
