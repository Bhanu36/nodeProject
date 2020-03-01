const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
dotenv.config();

//import routes
const regRoute = require("./routes/login/registration.routes");
const authRoute = require("./routes/dashboard/dashboard.routes");

//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected DB");
  }
);

//MiddleWare
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//route middlewares
app.use("/", regRoute);
app.use("/auth", authRoute);

app.listen(3000, () => console.log("server up and running"));
