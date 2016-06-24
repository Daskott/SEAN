var gulp = require('gulp');
var livereload = require('gulp-livereload');

//watch src files for changes & apply them to assets & browesr
gulp.task('watch',['vendor-css','vendor-js','css','js'], function(){
    livereload({start:true});//listen for changes to update  browesr
    gulp.watch('./css/**/*.styl',['css']); //watch css
    gulp.watch('./vendor/css/*.css',['vendor-css']); 
    gulp.watch('./ng/**/*.js',['js']); //watch js
    gulp.watch('./vendor/js/*.js',['vendor-js']); 
});
