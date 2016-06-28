let gulp = require('gulp'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config');

gulp.task('build', () => {
  gulp.src('index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
