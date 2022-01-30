const express = require("express");
const app = express();
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
// const cookieParser = require('cookie-parser');

// import routes
const userRouter = require("./routes/userRoutes");
const artistRouter = require("./routes/artistRoutes");

// env configuration
const dotenv = require("dotenv");
dotenv.config();

// databse connection
require("./config/dbConfig");

// declare port
const port = process.env.PORT || 3000;

// middleware
app.use(morgan("dev"));
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

// image path set
app.use(express.static(path.join(__dirname, "../uploads")));

//routes use
app.use("/api/v1/user", userRouter);
app.use("/api/v1/artist", artistRouter);

app.listen(port, () => {
  console.log(chalk.yellow(`Server running at http://localhost:${port}/`));
});
