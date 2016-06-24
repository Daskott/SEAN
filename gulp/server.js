var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

// gulp task to start Server
// node starts server & watch's all '.js' for changes & restarts
// except for the one's included in ignore
gulp.task('dev:server', function () {
  nodemon({
      script: 'server.js',
      ext: 'js' ,
      ignore: ['ng*', 'gulp*', 'assets*']
  });
});
