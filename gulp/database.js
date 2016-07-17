'use strict'
var gulp = require('gulp');
var shell = require('gulp-shell');
var colors = require('colors');
var models = require(__dirname+'/../models');
var User = models.User;
var Role = models.Role;
var UserRole = models.UserRole;

//run all seed files
gulp.task('db:seed',shell.task(['./node_modules/.bin/sequelize db:seed:all']));

//remove [roles] seed data
gulp.task('db:seed:undo-roles',shell.task(['./node_modules/.bin/sequelize db:seed:undo --seed 20160709225805-roles']));

//migrate database
gulp.task('db:migrate',shell.task(['./node_modules/.bin/sequelize db:migrate']));

//undo migration
gulp.task('db:migrate:undo',shell.task(['./node_modules/.bin/sequelize db:migrate:undo']));

//make user admin
gulp.task('user', function(){
  //get arguments
  var index = process.argv.indexOf("--admin");
  var username = index !== -1?process.argv[index+1]:'';

  if(!username && process.argv.indexOf("user") !== -1){
    console.log("please provide proper arguments:\n--user:admin <username>".red)
    return;
  }



  //update user roleId in db
  User.find({ where: {username: username}})
  .then(function(user) {
    // if the record exists in the db
    if (user) {

      //find admin record
      Role.findOne({ where: {name: "Admin"} })
      .then(function(role){

        // then update user to Admin
        User.update({roleId:role.id}, { where: {id: user.id} })
        .then(function(role){
          console.log("'"+username+"' is now an admin");
          process.exit();
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
      process.exit();
    }
  })
  .catch(function(error){
    console.log(("Error: "+error.message).red);
    process.exit();
  });

});
