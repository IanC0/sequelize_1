//creating a variable that will manipulate the database, opens and closes connection to database at point of use (rather than being open all the time)
require("dotenv").config();
const { Sequelize } = require("sequelize");

// shorthand way of creating a const and then module.exports. However will require curly brackets around {sequelize}
exports.sequelize = new Sequelize(process.env.MYSQL_URI)