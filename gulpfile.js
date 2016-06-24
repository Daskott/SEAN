/*********************************************
* build config instructions
* generate files in 'assets' dir
* watch files defined and generate new assets
**********************************************/

var gulp = require('gulp');
var fs = require('fs');

//auto require every file in 'gulp' dir
fs.readdirSync(__dirname + '/gulp').forEach(function (task) { require('./gulp/' + task) });

/****************************************
* define meta tasks
*******************************************/
//gulp.task('watch',['watch:css','watch:js']); //watch task

gulp.task('dev',['watch','dev:server']);

gulp.task('default',['dev']); //default gulp task
