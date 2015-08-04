var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var exec = require('child_process').exec;
var webpack = require('gulp-webpack');

gulp.task('default', ['build'], function() {});

// Actually start server by entering "mongod" in the command line
// gulp.task('mongod', function() {
//   exec('mongod', function(err, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (err !== null) {
//       console.log('exec error: ' + err);
//     }
//   });
// });

gulp.task('test', function() {
  return gulp.src('test/*test.js')
            .pipe(mocha());
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
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack', 'copy']);

gulp.watch(['app/js/*.js', 'app/*.html'], ['copy', 'webpack'])

