const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  define: dbConfig.define,
  port: dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.rooms = require("./room.model.js")(sequelize, Sequelize);
db.roombookings = require("./roombooking.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.tokens = require("./token.model.js")(sequelize, Sequelize);
db.rent = require("./rent.model.js")(sequelize, Sequelize);

db.users.hasOne(db.tokens, {
  as: 'token',
  foreignKey:"userId"
})

db.tokens.belongsTo(db.users, {
  as: 'user',
  foreignKey:"userId"
})

db.books.hasOne(db.rent, {foreignKey: 'ID_Book', as: 'Rents'});
db.rent.belongsTo(db.books, {foreignKey: 'ID_Book', as: 'Book'});

db.rent.belongsTo(db.users, { foreignKey: 'ID_User',as: 'rents' });
db.users.hasMany(db.rent, { foreignKey: 'ID_User', as: 'Users' });


// Sync the models to create or update the database schema
db.sequelize.sync({ alter: true })
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Error synchronizing database:", err));

module.exports = db;
