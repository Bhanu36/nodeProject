const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const { client } = require("./services/redisConnection.service");
dotenv.config();

//import routes
const regRoute = require("./routes/login/registration.routes");
const authRoute = require("./routes/dashboard/dashboard.routes");
//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false },
  () => {
    console.log(process.env.DB_CONNECT)
    console.log("connected DB");
  }
);

//MiddleWare
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan(function (tokens, req, res) {
    return chalk.blackBright(
      `[${tokens.status(req, res)}] ${tokens.url(req, res)} ${tokens.method(
        req,
        res
      )} ----- ${tokens["response-time"](req, res)}`
    );
  })
);
//route middlewares
app.use("/", regRoute);
app.use("/auth", authRoute);

app.listen(process.env.PORT || 3000, () =>
  console.log("server up and running on port", process.env.PORT)
);
