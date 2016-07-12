var UserModel = require(__dirname+'/../../../models/').Users;

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
    UserModel.find({
      where: {
        username: username
      }
    })
    .then(function(user) {
      // if the record exists in the db
      if (user) {
          UserModel.update(
              {roleId:0}
            ,
            {
              where: {username: username}
            })
          .then(function(data) {
              //do stuff
          })
          .catch(function(error){
            console.log("Error: "+error.message);
          });
      }else{
        console.log(("user '"+username+"' does not exits!").red);
      }
    })
    .catch(function(error){
      console.log(("Error: "+error.message).red);
    });

  };

};

module.exports = User;
