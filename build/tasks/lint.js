var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');

const lint = () => {
  return gulp.src(paths.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
};

export default lint;
