const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  API_PATH: process.env.API_PATH,
  DB_PATH: process.env.DB_PATH
};
