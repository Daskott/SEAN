'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file !== "index.js") && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/*
* define model/table relationships
*/
var user = sequelize.models.User;
var role = sequelize.models.Role;
var userRole = sequelize.models.UserRole;

// one-to-many relationship
// 1 user - 1 role
// 1 role - many users
user.belongsTo(role, {foreignKey: 'roleId'})

//export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
