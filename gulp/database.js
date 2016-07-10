'use strict'
var gulp = require('gulp');
var shell = require('gulp-shell');
var colors = require('colors');
var models = require(__dirname+'/../models');
var User = models.Users;

//run all seed files
gulp.task('db:seed',shell.task(['./node_modules/.bin/sequelize db:seed:all']));

//remove [roles] seed data
gulp.task('db:seed:undo-roles',shell.task(['./node_modules/.bin/sequelize db:seed:undo --seed 20160709225805-roles']));

//migrate database
gulp.task('db:migrate',shell.task(['./node_modules/.bin/sequelize db:migrate']));

//undo migration
gulp.task('db:migrate:undo',shell.task(['./node_modules/.bin/sequelize db:migrate:undo']));

//make user admin
gulp.task('user', makeUserAdmin());

/****************************************
* helper function
*******************************************/

function makeUserAdmin(){
  //get arguments
  var index = process.argv.indexOf("--admin");
  var username = index !== -1?process.argv[index+1]:'';

  if(!username){
    console.log("please provide proper arguments:\n--user:admin <username>".red)
    return;
  }

  //update user roleId in db
  User.find({
    where: {
      username: username
    }
  })
  .then(function(user) {
    // if the record exists in the db
    if (user) {
        User.update(
            {roleId:0}
          ,
          {
            where: {username: username}
          })
        .then(function(data) {
            console.log("'"+username+"' is now an admin");
            process.exit();
        })
        .catch(function(error){
          console.log("Error: "+error.message);
          process.exit();
        });
    }else{
      console.log(("user '"+username+"' does not exits!").red);
      process.exit();
    }
  })
  .catch(function(error){
    console.log(("Error: "+error.message).red);
    process.exit();
  });

}
