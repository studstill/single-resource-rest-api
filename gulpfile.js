var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var exec = require('child_process').exec;
var webpack = require('gulp-webpack');

gulp.task('default', ['build','startServer'], function() {});

// Actually start server by entering "mongod" in the command line
gulp.task('startServer', function() {
  exec('node server.js', function(err, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
});

gulp.task('lint', function() {
  return gulp.src(['*.js', '*/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('webpack', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function() {
  return gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack', 'copy']);

// gulp.watch(['app/**/*.js', 'app/*.html', 'app/*.css'], ['copy', 'webpack']);

