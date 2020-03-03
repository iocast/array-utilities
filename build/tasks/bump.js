var gulp = require('gulp');
var paths = require('../paths');
var changelog = require('conventional-changelog');
var fs = require('fs');
var gulpBump = require('gulp-bump');
var args = require('../args');

// utilizes the bump plugin to bump the
// semver for the repo
const bumpVersion = () => {
  return gulp.src(['./package.json'])
    .pipe(gulpBump({ type: args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
};

// generates the CHANGELOG.md file based on commit
// from git commit messages
const changeLog = (callback) => {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: paths.doc + '/CHANGELOG.md'
  }, function (err, log) {
    fs.writeFileSync(paths.doc + '/CHANGELOG.md', log);
  });
};

// calls the listed sequence of tasks in order
export {
  bumpVersion,
  changeLog
}

const bump = gulp.series(bumpVersion, changeLog) ;

export default bump;
