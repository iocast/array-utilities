var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var merge = require('merge2');
var through2 = require('through2');
var gutil = require('gulp-util');
var gulpIgnore = require('gulp-ignore');
var concat = require('gulp-concat');
var insert = require('gulp-insert');

var assign = Object.assign || require('object.assign');

var compilerOptions = require('../babel-options');
var paths = require('../paths');

var relativeImports = /import\s*{[a-zA-Z0-9_\$\,\s]+}\s*from\s*'(\.[^\s']+)';\s*/g;
var nonRelativeImports = /import(\s*{?[a-zA-Z0-9_\$\*\,\s]+}?)?(\s*as\s*[a-zA-Z0-9_\$]+)?(\s*from)?\s*'[a-zA-Z0-9_\-\/]+';\s*/g;
var importGrouper = /import\s*{([a-zA-Z0-9_\$\,\s]+)}\s*from\s*'([a-zA-Z0-9_\-\/]+)'\s*;\s*/;

var jsName = paths.packageName + '.js';
var compileToModules = ['es2015', 'commonjs', 'amd', 'system', 'native-modules'];


function srcForBabel() {
  return merge(
    gulp.src(paths.output + jsName),
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


function extractImports(content, importsToAdd) {
  var matchesToKeep = content.match(nonRelativeImports);

  if (matchesToKeep) {
    matchesToKeep.forEach(function(toKeep) {
      importsToAdd.push(toKeep)
    });
  }

  content = content.replace(nonRelativeImports, '');
  content = content.replace(relativeImports, '');

  return content;
}

function createImportBlock(importsToAdd) {
  var finalImports = {},
    importBlock = '';

  importsToAdd.forEach(function(toAdd) {
    var groups = importGrouper.exec(toAdd);
    if (!groups) {
      toAdd = toAdd.trim();
      if (importBlock.indexOf(toAdd) === -1) {
        importBlock += toAdd + '\n';
      }

      return;
    };

    var theImports = groups[1].split(',');
    var theSource = groups[2].trim();
    var theList = finalImports[theSource] || (finalImports[theSource] = []);

    theImports.forEach(function(item) {
      item = item.trim();
      if (theList.indexOf(item) === -1) {
        theList.push(item);
      }
    });
  });

  Object.keys(finalImports).forEach(function(key) {
    importBlock += 'import {' + finalImports[key].join(',') + '} from \'' + key + '\';\n';
  });

  return importBlock + '\n';
}

compileToModules.forEach(function(moduleType) {
  gulp.task('build-babel-' + moduleType, function() {
    return srcForBabel()
      .pipe(to5(assign({}, compilerOptions[moduleType]())))
      .pipe(gulp.dest(paths.output + moduleType));
  });
});

gulp.task('build-index', function() {
  var importsToAdd = paths.importsToAdd.slice();

  var src = gulp.src(paths.files);

  if (paths.ignore) {
    paths.ignore.forEach(function(filename) {
      src = src.pipe(gulpIgnore.exclude(filename));
    });
  }

  return src.pipe(through2.obj(function(file, enc, callback) {
      file.contents = new Buffer(extractImports(file.contents.toString('utf8'), importsToAdd));
      this.push(file);
      return callback();
    }))
    .pipe(concat(jsName))
    .pipe(insert.transform(function(contents) {
      return createImportBlock(importsToAdd) + contents;
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'build-index',
    compileToModules
    .map(function(moduleType) {
      return 'build-babel-' + moduleType
    })
    .concat([]),
    callback
  );
});
