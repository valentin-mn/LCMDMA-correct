const {DataTypes} = require('sequelize');
const sequelize = require('../../db.js');
const message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    contenu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },

}, {
    timestamps: false
});

module.exports = message;