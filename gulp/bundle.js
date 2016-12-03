var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    concat = require('gulp-concat');

gulp.task('bundle', function () {
    return gulp.src('app/main.js')
        .pipe(webpack(require('../webpack.config')))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/js'))
});
