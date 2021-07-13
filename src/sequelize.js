const Sequelize = require("sequelize")
const { database } = require("./keys")

const sequelize = new Sequelize(
  database.DB,
  database.User,
  database.Password,
  database.URIse
);
sequelize
  .authenticate()
  .then(() => {
    console.log("la base de datos esta conectada");
  })
  .catch((err) => {
    console.error("clack error :", err);
  });

module.exports = sequelize
