var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var livereload = require('gulp-livereload');


/*
* gulp.scr -> get all ng-js files in 'ng'
* concat -> concat them[make sure module.js comes 1st]
* ngAnnotate -> rewrite file to make it compatible with minification
* uglify -> minify them
* sourcemaps -> create a source map to minified file,
*               so you can know where things happen [for debugging]
* gulp.dest-> then save output in 'assets/app.js'
*/
gulp.task('js', function(){
  gulp.src([/*'./ng/firebase.js',*/'./ng/module.js','./ng/**/*.js'])
  //.pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  //.pipe(ngAnnotate())
  //.pipe(uglify())
  //.pipe(sourcemaps.write())
  .pipe(gulp.dest('public/assets'))
  .pipe(livereload());
});



/****************************************************
* Task for bower components [front-end dependecies]
*****************************************************/
var lib  = require('bower-files')({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                        './dist/css/bootstrap.css',
                        './dist/fonts/*.*'
                    ]
                }
            }
        });

var uglifycss = require('gulp-uglifycss');

//js
gulp.task('bower-js', function () {
  gulp.src(lib.ext('js').files)
    .pipe(concat('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/vendor/js'));
});

//css
gulp.task('bower-css', function () {
  gulp.src(lib.ext('css').files)
    .pipe(concatCss('lib.min.css'))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('assets/vendor/css'));
});

//all bower
gulp.task('bower', ['bower-css','bower-js']);
