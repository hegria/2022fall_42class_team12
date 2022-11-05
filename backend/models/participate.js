const {Sequelize, DataTypes} = require('sequelize');
module.exports = function(sequelize) {
    const Participate = sequelize.define("Participate", {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        accept:{
            field: 'accept',
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'participate',
        underscored: false,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci"
    });
    return Participate;
};