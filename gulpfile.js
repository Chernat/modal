var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('app/scss/*.+(sass|scss)')
  .pipe(sass())
  .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
  gulp.watch('app/scss/*.+(sass|scss)', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('finished', ['sass'], function() {
  gulp.src('app/css/*.css')
  .pipe(gulp.dest('dist/css'))
  gulp.src('app/*.html')
  .pipe(gulp.dest('dist/'))
})
