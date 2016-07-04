var db = require('../databaseConfig');
var Sequelize = require('sequelize');

//sequelize.define('name', {attributes}, {options}).
var User = db.define('users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

//force creation of table, if it does ot already exist
User.sync();//.then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock',
//     username: 'Lanesta',
//     password: 'password'
//   });
// });

module.exports = User;
