const gulp = require('gulp');
const replace = require('gulp-replace');
const yaml = require('gulp-yaml');
const del = require('del');
const connect = require('gulp-connect');

const swaggerRoot = 'specs/maas-v1.json'

// Wait for clean:docs to finish to avoid filesystem errors
gulp.task('copy-swagger-ui', ['clean:docs'], function() {
  // Copies everything
  return gulp.src(['node_modules/swagger-ui-dist/*', '!node_modules/swagger-ui-dist/index.html'])
    .pipe(gulp.dest('docs'));
});

// Wait for clean:docs to finish to avoid filesystem errors
gulp.task('copy-specs', ['clean:docs'], function() {
  return gulp.src(['specs/**/*.json', 'specs/**/*.png', 'specs/**/*.svg'])
    .pipe(gulp.dest('docs/specs'));
});

gulp.task('watch-specs', function() {
  gulp.watch(['specs/**/*.yml'], ['clean:docs', 'transform-yaml', 'copy-swagger-ui', 'copy-specs']);
})

gulp.task('transform-yaml', function() {
  return gulp.src('./specs/*.yml')
    .pipe(yaml({ safe: true, space: 2 }))
    .pipe(gulp.dest('./specs/'))
});

gulp.task('clean:docs', function () {
  return del(['docs/*', '!docs/index.html']);
});

gulp.task('serve', function() {
  return connect.server({
    root: 'docs',
    livereload: true
  });
});

// Aliases

gulp.task('docs', ['copy-swagger-ui', 'copy-specs']);
gulp.task('build', ['transform-yaml']);
gulp.task('clean', ['clean:docs']);
gulp.task('watch', ['watch-specs']);
