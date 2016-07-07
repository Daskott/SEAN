var db = require('../databaseConfig');
var Sequelize = require('sequelize');

//sequelize.define('name', {attributes}, {options}).
var Role = db.define('roles', {
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
  {
    freezeTableName: true // Model tableName will be the same as the model name
});

//force creation of table, if it does not already exist
//and create roles
Role.sync()
.then(function () {
  // Table created
  var user = {
        roleId: 1,
        name: "User",
        description:  "can veiw"
  };

  var admin = {
        roleId: 0,
        name: "Admin",
        description:  "can veiw, can delete"
  };

  //create admin role
  Role.findOrCreate({where: {roleId: admin.roleId}, defaults: admin})
  .spread(function(user, created) {
      //  if(created)
      //   console.log("Admin role created!");
      //  else
      //   console.log("Admin role already exist!");
   })
  .catch(function(error){
      console.log("Error: "+error);
  });

  //create user role
  Role.findOrCreate({where: {roleId: user.roleId}, defaults: user})
  .spread(function(user, created) {
      // if(created)
      //  console.log("User role created!");
      // else
      //  console.log("User role already exist!");
   })
  .catch(function(error){
      console.log("Error: "+error);
  });

});

module.exports = Role;
