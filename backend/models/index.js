const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Project = require('./project')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Star = require('./star')(sequelize, Sequelize);
db.Participate = require('./Participate')(sequelize, Sequelize);

db.User.hasMany(db.Project, {
    foreignKey: 'leader',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.User.hasMany(db.Participate, {
    foreignKey: 'user',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.User.hasMany(db.Star, {
    foreignKey: 'user',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});

db.Project.belongsTo(db.User,{
    foreignKey: 'leader'
})
db.Project.hasMany(db.Participate, {
    foreignKey: 'project',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.Project.hasMany(db.Star, {
    foreignKey: 'project',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});

db.Star.belongsTo(db.User,{
    foreignKey: 'user'
})
db.Star.belongsTo(db.Project,{
    foreignKey: 'project'
})

db.Participate.belongsTo(db.User,{
    foreignKey: 'user'
})
db.Participate.belongsTo(db.Project,{
    foreignKey: 'project'
})

module.exports = db;