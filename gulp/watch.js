var gulp = require('gulp');
var livereload = require('gulp-livereload');

//watch src files for changes & apply them to assets & browesr
gulp.task('watch',['bower','css','js'], function(){
    livereload({start:true});//listen for changes to update  browesr
    gulp.watch('./css/**/*.styl',['css']); //watch css
    gulp.watch('./bower_components/**/**/*.css',['bower-css']);
    gulp.watch('./ng/**/*.js',['js']); //watch js
    gulp.watch('./bower_components/**/**/*.js',['bower-js']);
});
