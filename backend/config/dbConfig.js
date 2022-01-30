const mongoose = require('mongoose');
const chalk = require('chalk');

//mongo db connection
mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log(chalk.blue('Database Connected'));
}).catch( (err) => {
    console.log(chalk.red('Database Not Connected' + err));
});

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     });
//     console.log('MongoDB Connected: ' + conn.connection.host);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// module.exports = connectDB;