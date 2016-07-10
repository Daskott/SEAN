/*********************************************
* build config instructions
* generate files in 'assets' dir
* watch files defined and generate new assets
**********************************************/
require('dotenv').config();
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var fs = require('fs');

//auto require every file in 'gulp' dir
fs.readdirSync(__dirname + '/gulp').forEach(function (task) { require('./gulp/' + task) });

/****************************************
* define meta tasks
*******************************************/

//database is seeded each time you run gulp
gulp.task('dev', gulpsync.sync(['dev:server','db:migrate','db:seed','watch']));

gulp.task('default',['dev']); //default gulp task
