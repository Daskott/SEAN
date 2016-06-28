require('dotenv').config();
var Sequelize = require('sequelize');

console.log('SEAN', process.env.DB_USER, process.env.DB_PASS);
var sequelize = new Sequelize('SEAN', process.env.DB_USER, process.env.DB_PASS,{
  host: process.env.DB_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // mysql only
  storage: process.env.DB_STORAGE//'/usr/bin/mysql'
});


// //Test
// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

 module.exports = sequelize;
