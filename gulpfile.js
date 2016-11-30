'use strict';

var gulp = require('gulp');

require('./gulp/bundle');

gulp.task('watch:bundle', ['bundle'], function () {
    gulp.watch([
        'app/**/*.js',
        'lib/**/*.js'
    ], ['bundle']);
});
