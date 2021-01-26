const gulp = require('gulp');
const css = require('./css.js');
const img = require('./image.js');
const js = require('./js.js');
const html = require('./html.js');
const apiJs = require('./apiJs.js');
const apiPhp = require('./apiPhp.js');
const configuration = require('./configuration.js');

gulp.task('watch', (callback) => {
    gulp.watch(css.fileAll, gulp.series('buildCss'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(js.fileAll, gulp.series('buildJs'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(html.fileAll, gulp.series('buildHtml'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(img.fileAll, gulp.series('buildImage'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(apiJs.fileAll, gulp.series('buildApiJs'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(apiPhp.fileAll, gulp.series('buildApiPhp'))
        .on('change', (event) => {
            console.log(event);
        });

    callback();
});