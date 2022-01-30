const express = require('express');
const app = express();
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');

// env configuration
const dotenv = require("dotenv");
dotenv.config();

// databse connection
require('./config/dbConfig');

// import routes
const userRouter = require('./routes/userRoutes');

// declare port
const port = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// image path set 
app.use(express.static('uploads'));

//routes use
app.use('/api/v1/user',userRouter);

app.listen(port, () => {
    console.log(chalk.yellow(`Server running at http://localhost:${port}/`));
});