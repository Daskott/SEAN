var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var livereload = require('gulp-livereload');


//preprocess general style sheet
gulp.task( 'css', function(){
  gulp.src(['./css/*.styl', './css/regularUser/*.styl', './css/admin/*.styl'])
  .pipe(stylus())
  .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
  .pipe(concatCss('app.css'))
  .pipe(gulp.dest('public/assets'))
  .pipe(livereload());
});
