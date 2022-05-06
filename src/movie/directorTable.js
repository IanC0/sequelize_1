const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Director = sequelize.define("Director", {
    name: {
        type: DataTypes.STRING,
        allowNull: false, //automatically true
        unique: true, //automatically false
        defaultValue: "To be confirmed"
    }
})

module.exports = Director;