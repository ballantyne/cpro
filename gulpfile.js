const path          = require('path');
const child_process = require('child_process');
const gulp          = require('gulp');
const mocha         = require('gulp-mocha');
const ts            = require('gulp-typescript');
const tsProject     = ts.createProject('tsconfig.json');
const env           = require('gulp-env');
const istanbul      = require('gulp-istanbul');

gulp.task('typescript', function typescript() {
  return gulp.src('./src/**/*.ts')
    .pipe(tsProject()).js
    .pipe(gulp.dest('./dist'));
});

gulp.task('analyze', function() {
  return gulp.src([
    './dist/**/*.js'
  ]).pipe(istanbul({
    includeUntested: true
  }))
  .pipe(istanbul.hookRequire());
})

gulp.task('specs', function specs() {
  var reporters = [
    'lcov',
  ];

  env({
    file: path.join(__dirname, 'config', 'environments', 'test', '.env'),
    vars: {
      NODE_ENV: 'test'
    }
  });

  return gulp.src([
    './test/**/*.test.js',
  ], {
    read: false
  }).pipe(mocha({
    reporter: 'spec',
    exit: true
  }))
  .pipe(istanbul.writeReports({
    dir: './reports/coverage',
    reporters: reporters,
    reportOpts: { dir: './reports/coverage' }
  }))
  .pipe(istanbul.enforceThresholds({
    thresholds: {
      global: {
        lines: 0
      }
    }
  }));;
});

gulp.task('watcher', function watcher() {
  gulp.watch([
    './src/**/*.ts'
  ], gulp.series('compile'));
  gulp.watch([
    './dist/**/*.js',
    './test/**/*.js'
  ], gulp.series('test'));
})

gulp.task('default', gulp.series('typescript', 'watcher'));
gulp.task('compile', gulp.series('typescript'));
gulp.task('test', gulp.series('analyze', 'specs'))
