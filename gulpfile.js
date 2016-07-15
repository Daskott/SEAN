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

gulp.task('db:init', gulpsync.sync(['db:migrate','db:seed']));

gulp.task('test', gulpsync.sync(['karma','mocha','protractor']));

gulp.task('dev', ['dev:server', 'watch']);

gulp.task('default',['dev']); //default gulp task
