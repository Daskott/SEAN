require('dotenv').config();
var Sequelize = require('sequelize');

var sequelize = new Sequelize('SEAN', process.env.DB_USER, process.env.DB_PASS,{
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,// disable logging; default: console.log
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // mysql only
  storage: process.env.DB_STORAGE
});

 module.exports = sequelize;
