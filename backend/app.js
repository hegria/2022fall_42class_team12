const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

const sequelize = require('./models').sequelize;
sequelize.sync({force: true}).then(()=> {
    console.log('database connect');
}).catch((err)=> {
    console.log(err);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const router = require('./routes/index');
app.use("/", router);

app.listen(5000, () => {
    console.log("backend server started at port 5000");
});

module.exports = app;