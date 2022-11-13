const {Sequelize, DataTypes} = require('sequelize');
module.exports = function(sequelize) {
    const User = sequelize.define("User", {
        userId: {
            field: 'userId',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id: {
            field: 'id',
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            field: 'name',
            type: DataTypes.STRING,
            allowNull: false,
        },
        major: {
            field: 'major',
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            field: 'link',
            type: DataTypes.STRING,
            allowNull: true,
        },
        stacks:{
            field: 'stacks',
            type: DataTypes.STRING,
            allowNull: true,
        },
        interest:{
            field: 'interest',
            type: DataTypes.STRING,
            allowNull: true,
        },
        message:{
            field: 'message',
            type: DataTypes.STRING(5000),
            allowNull: true,
        },
        image:{
            field: 'image',
            type: DataTypes.STRING(5000),
            allowNull: true,
        }
    }, {
        tableName: 'user',
        underscored: false,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci"
    });
    return User;
};
