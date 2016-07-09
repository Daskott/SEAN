var gulp = require('gulp');
var shell = require('gulp-shell');

//run all seed files
gulp.task('db:seed',shell.task(['./node_modules/.bin/sequelize db:seed:all']));

//remove [roles] seed data
gulp.task('db:seed:undo-roles',shell.task(['./node_modules/.bin/sequelize db:seed:undo --seed 20160709225805-roles']));

//migrate database
gulp.task('db:migrate',shell.task(['./node_modules/.bin/sequelize db:migrate']));

//undo migration
gulp.task('db:migrate:undo',shell.task(['./node_modules/.bin/sequelize db:migrate:undo']));
