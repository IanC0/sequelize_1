const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

//what columns, and what restrictions on the columns (INT AUTO INCREMENT etc)
const Movie = sequelize.define("Movie", {
    title: {
        type: DataTypes.STRING,
        allowNull: false, //automatically true
        unique: true, //automatically false
        defaultValue: "To be confirmed"
    },
    actor: {
        type: DataTypes.STRING,
        defaultValue: "To be confirmed"
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    metacritic_score: {
        type: DataTypes.INTEGER
    }
})

module.exports = Movie; //has to module.exports when exporting a class