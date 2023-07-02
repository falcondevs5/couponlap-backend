const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.ADMIN_DB_USERNAME,
    password: process.env.ADMIN_DB_PASSWORD,
    database: process.env.ADMIN_DB_NAME,
    host: process.env.ADMIN_DB_HOST,
    dialect: process.env.ADMIN_DB_TYPE,
  },
};