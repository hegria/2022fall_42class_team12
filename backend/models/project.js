const {Sequelize, DataTypes} = require('sequelize');
module.exports = function(sequelize) {
    const Project = sequelize.define("Project", {
        projectId: {
            field: 'projectId',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            field: 'name',
            type: DataTypes.STRING,
            allowNull: false,
        },
        topic: {
            field: 'topic',
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            field: 'contact',
            type: DataTypes.STRING,
            allowNull: false,
        },
        stacks:{
            field: 'stacks',
            type: DataTypes.STRING,
            allowNull: false,
        },
        required: {
            field: 'required',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        current: {
            field: 'current',
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stars: {
            field: 'stars',
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        startTime:{
            field: 'startTime',
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime:{
            field: 'endTime',
            type: DataTypes.DATE,
            allowNull: false,
        },
        image:{
            field: 'image',
            type: DataTypes.STRING,
            allowNull: true,
        },
        message:{
            field: 'message',
            type: DataTypes.STRING(5000),
            allowNull: true,
        }
    }, {
        tableName: 'project',
        underscored: false,
        freezeTableName: true,
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci"
    });
    return Project;
};
