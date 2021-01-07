const gulp = require('gulp');
const css = require('./css.js');
const img = require('./image.js');
const js = require('./js.js');
const template = require('./template.js');
const api = require('./api.js');
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

    gulp.watch(template.fileAll, gulp.series('buildTemplate'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(img.fileAll, gulp.series('buildImage'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(api.fileAll, gulp.series('buildApi'))
        .on('change', (event) => {
            console.log(event);
        });

    callback();
});