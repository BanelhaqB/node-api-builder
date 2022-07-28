// const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('name: ', err.name);
  console.log('message: ', err.message);
  console.log('UNCAUGHT EXCEPTION! 🛠 Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// -- PostgreSQL database connexion

// const options = {
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//   port: process.env.PGPORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };
// const connect = async () => {
//   const { Pool } = require('pg');
//   const pool = new Pool(options);

//   pool.connect();

//   global['pool'] = pool;

//   return pool;
// };

// connect();

// -- MongoDB database connexion
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('DB connection successful!'));

//console.log(process.env);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(1, err.name);
  console.log(2, err.message);
  console.log(2, err.stack);
  console.log('UNHANDLER REJECTION! 🔒 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
