var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var merge = require('merge2');
var gutil = require('gulp-util');


var assign = Object.assign || require('object.assign');


var compilerOptions = require('../babel-options');
var paths = require('../paths');


var jsName = paths.packageName + '.js';
var compileToModules = ['es2015', 'commonjs', 'amd', 'system', 'native-modules'];


function srcForBabel() {
  return merge(
    gulp.src(paths.source),
    gulpFileFromString(paths.output + 'index.js', "export * from './" + paths.packageName + "';")
  );
}

function gulpFileFromString(filename, string) {
  var src = require('stream').Readable({
    objectMode: true
  });
  src._read = function() {
    this.push(new gutil.File({
      cwd: paths.appRoot,
      base: paths.output,
      path: filename,
      contents: new Buffer(string)
    }))
    this.push(null)
  }
  return src;
}

compileToModules.forEach(function(moduleType) {
  gulp.task('build-babel-' + moduleType, function() {
    return srcForBabel()
      .pipe(to5(assign({}, compilerOptions[moduleType]())))
      .pipe(gulp.dest(paths.output + moduleType));
  });
});


gulp.task('build-es2015-temp', function() {
  return gulp.src(paths.output + jsName)
    .pipe(to5(assign({}, compilerOptions.commonjs())))
    .pipe(gulp.dest(paths.output + 'temp'));
})

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'build-es2015-temp',
    compileToModules
    .map(function(moduleType) {
      return 'build-babel-' + moduleType
    })
    .concat([]),
    callback
  );
});
