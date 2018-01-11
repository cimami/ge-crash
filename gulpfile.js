var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var pkg = require('./package.json');


// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('copy', function() {
  gulp.src([
      'data/accidents.json'
    ])
    .pipe(gulp.dest('app/data'))
})

// Dev task with browserSync
gulp.task('dev', ['copy', 'browserSync'], function() {
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/*.js', browserSync.reload);
  //gulp.watch('data/*.json', browserSync.reload);
});
