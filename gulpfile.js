const gulp = require('gulp');

const config = {
  copy: {
    src: './components/**/*.{scss,jpg,png}',
    dest: './dist'
  }
};

gulp.task('copy', function() {
  gulp.src(config.copy.src, { buffer: false })
    .pipe(gulp.dest(config.copy.dest));
});
