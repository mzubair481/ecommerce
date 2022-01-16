require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce_db', 'ecommerce', process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});

module.exports = (sequelize);
