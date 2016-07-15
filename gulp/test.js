var gulp = require('gulp');
var mocha = require('gulp-mocha');
var angularProtractor = require('gulp-angular-protractor');
var karma = require('karma').Server;

gulp.task('mocha', function () {
	return gulp.src('test/server/api/user.spec.js')
		// gulp-mocha needs filepaths so you can't have any plugins before it
		.pipe(mocha({timeout: 5000}))
    .once('end', function () {
			//process.exit();
		});
});

gulp.task('karma', function(done) {
    karma.start({
        configFile: __dirname+'/../karma.conf.js'
    }, function() {
        done();
    });
});

gulp.task('protractor', function() {
  gulp.src(['./test/e2e/*.spec.js'])
  	.pipe(angularProtractor({
  		'configFile': 'protractor.conf.js',
  		'autoStartStopServer': true,
  		'debug': true
  	}))
  	.on('error', function(e) { throw e })
});
