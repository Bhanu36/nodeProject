const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require('cors');
dotenv.config();

//import routes
const regRoute = require("./routes/login/registration.routes");
const openRoutes = require("./routes/CRUD/student.routes")
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
//route middlewares
app.use("/", regRoute);
app.use("/stu",openRoutes)
app.use("/auth", authRoute);

app.listen(process.env.PORT || 3000, () =>
  console.log("server up and running on port", process.env.PORT)
);
