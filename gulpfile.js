var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var exec = require('child_process').exec;

gulp.task('default', ['mongod', 'test', 'lint'], function() {});

// Actually start server by entering "mongod" in the command line
gulp.task('mongod', function() {
  exec('mongod', function(err, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
});

gulp.task('test', function() {
  return gulp.src('test/*test.js')
            .pipe(mocha());
});

gulp.task('lint', function() {
  return gulp.src(['*.js', '*/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
});

