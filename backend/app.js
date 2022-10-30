const express = require('express');
const app = express();
const path = require('path');

const sequelize = require('./models').sequelize;
sequelize.sync({force: true}).then(()=> {
    console.log('database connect');
}).catch((err)=> {
    console.log(err);
});

const router = require('./routes/index');
app.use("/", router);

app.listen(5000, () => {
    console.log("backend server started at port 5000");
});

module.exports = app;