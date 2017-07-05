var gulp = require("gulp");
var server = require("gulp-server-livereload");
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('serv', ['build'], function () {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      port: process.env.PORT || 5000,
      open: true
    }));
});

gulp.task('watch', function () {
  gulp.watch('app/js/**/*.js', ['build']);
  gulp.watch('app/views/**/*.html', ['build']);
});

gulp.task('javascript', function () {
  return gulp.src([
    'app/js/**/*.js'
  ])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('build', ['clean', 'cleanJs', 'javascript'], function () {

  var buildCss = gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'))

  var buildJs = gulp.src('app/js/bundle.js')
    .pipe(gulp.dest('dist/js'))

  var buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  var buildMinJS = gulp.src('app/**/*.min.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['serv', 'watch']);

gulp.task('clean', function () {
  return del.sync('dist');
});

gulp.task('cleanJs', function () {
  return del.sync('app/js/bundle.js');
});