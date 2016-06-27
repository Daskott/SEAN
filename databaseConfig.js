var Sequelize = require('sequelize');

var sequelize = new Sequelize('SEAN', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // mysql only
  storage: '/usr/bin/mysql'
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