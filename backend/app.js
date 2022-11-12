const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const app = express();

require("dotenv").config();

const sequelize = require("./models").sequelize;

// 여기에서 force: true면 db 날라가서 나중에 이거 어느정도
// 테이블 스키마가 다 완료되면
// force: false로 바꿔줘야 함 안그러면 우리가 차곡차곡 모은 데이터가
// 다 날라감!!!!
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("database connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/users", require("./routes/users"));
app.use("/applications", require("./routes/applications"));
app.use("/projects", require("./routes/projects"));

app.listen(8001, () => {
  console.log("backend server started at port 8001");
});

module.exports = app;
