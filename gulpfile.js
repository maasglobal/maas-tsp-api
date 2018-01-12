const gulp = require('gulp');
const replace = require('gulp-replace');
const yaml = require('gulp-yaml');
const del = require('del');
const connect = require('gulp-connect');
const shell = require('gulp-shell')

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

gulp.task(
  'deploy',
  shell.task(
    [
      'git checkout -b gh-pages-tmp',
      // Remove .gitignore, so it won't be active
      'rm .gitignore',
      // ignore node modules for temp gh pages branch commit
      'echo "node_modules/" >> .gitignore'
      // Add all files, including the newly built site files
      'git add .',
      // Commit all changes for deployment
      'git commit -am "Remove gitignore; add built docs"',
      // Delete upstream gh-pages branch
      'git push upstream --delete gh-pages',
      // Push the docs folder to the upstream Github Pages branch
      'git subtree push --prefix docs upstream gh-pages',
      // Switch back to master branch
      'git checkout master',
      // Cleanup temp GitHub Pages branch
      'git branch -D gh-pages-tmp',
      // Put .gitignore back in place
      'git reset --hard HEAD'
    ]
  )
)

// Aliases

gulp.task('docs', ['copy-swagger-ui', 'copy-specs']);
gulp.task('build', ['transform-yaml']);
gulp.task('clean', ['clean:docs']);
gulp.task('watch', ['watch-specs']);
