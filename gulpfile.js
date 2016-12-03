var gulp = require('gulp'),
    fs = require('fs');

fs.readdirSync(__dirname + '/gulp').forEach(function (dir) {
    require('./gulp/' + dir);
});

gulp.task('watch:bundle', ['bundle'], function () {
    gulp.watch([
        'app/**/*.js',
        'lib/**/*.js'
    ], ['bundle']);
});
