const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

require('dotenv').config();

const sequelize = require('./models').sequelize;
sequelize.sync({force: true}).then(()=> {
    console.log('database connect');
}).catch((err)=> {
    console.log(err);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/users", require('./routes/users'));
app.use("/applications", require('./routes/applications'));
app.use("/projects", require('./routes/projects'));

app.listen(5000, () => {
    console.log("backend server started at port 5000");
});

module.exports = app;