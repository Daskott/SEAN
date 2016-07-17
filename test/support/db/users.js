var UserModel = require(__dirname+'/../../../models/').User;
var RoleModel = require(__dirname+'/../../../models/').Role;

var User = function() {

  this.destroy = function(username) {
    //delete user uing 'username' bcoz its unique
    UserModel.destroy({
        where: {
          username: username
        }
      })
      .then(function(rows){

        if(rows !== 1)
            console.log("No row was affected! user with username '"+username+"' may not exist.");
      })
      .catch(function(error){
        console.log(error.message);
      });
  };

  this.makeUserAdmin = function(username) {
    //update user roleId in db
    UserModel.find({ where: {username: username}})
    .then(function(user) {
      // if the record exists in the db
      if (user) {

        //find admin record
        RoleModel.findOne({ where: {name: "Admin"} })
        .then(function(role){
          // then update user to Admin
          UserModel.update({roleId:role.id}, { where: {id: user.id} })
          .then(function(role){
            return;
          })
          .catch(function(error){
             console.log("Error: "+error.message);
          });

        })
        .catch(function(error){
           console.log("Error: "+error.message);
        });
      }else{
        if(index !== -1){
          console.log(("user '"+username+"' does not exits!").red);
        }
      }
    })
    .catch(function(error){
      console.log(("Error: "+error.message).red);
    });

  };

};

module.exports = User;
