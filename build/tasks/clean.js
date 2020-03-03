var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

const clean = () => {
  return gulp.src([paths.output], { allowEmpty: true })
    .pipe(vinylPaths(del));
}
clean.description = 'cleans output folder'

export default clean;
