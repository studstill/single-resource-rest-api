'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var exec = require('child_process').exec;
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;

gulp.task('lint', function() {
  return gulp.src(['*.js', '**/*.js', '**/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('mochatest', ['karmatest'], function() {
  return gulp.src('test/mocha-tests/*test.js')
    .pipe(mocha());
});

gulp.task('webpack:test', function() {
 return gulp.src('test/karma-tests/entry.js')
   .pipe(webpack({
        output: {
          filename: 'test-bundle.js'
        }
      }))
      .pipe(gulp.dest('test/karma-tests/'));
});

// We make sure that webpack completes before we run karmatest
gulp.task('karmatest', ['webpack:test'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('copy', function() {
  return gulp.src(['app/**/*.html', 'app/**/*.css'])
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('default', ['build', 'mochatest', 'karmatest'], function() {});

gulp.watch(['app/**/*.js', 'app/**/*.html', 'app/*html', 'app/*.css'], ['copy', 'build']);

