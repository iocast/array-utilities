import gulp from 'gulp';

import { default as clean } from './build/tasks/clean';
import { default as lint } from './build/tasks/lint';
import { default as build } from './build/tasks/build';
import { default as bump } from './build/tasks/bump';

gulp.task(clean);
gulp.task("build", gulp.series(clean, build));

gulp.task("prepare-release", gulp.series(build, lint, bump));
