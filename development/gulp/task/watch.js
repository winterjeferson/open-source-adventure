const gulp = require('gulp');
const css = require('./css.js');
const img = require('./image.js');
const js = require('./js.js');
const template = require('./template.js');
const apiJson = require('./api-json.js');
const dataBaseJson = require('./data-base-json.js');
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

    gulp.watch(apiJson.fileAll, gulp.series('buildApiJson'))
        .on('change', (event) => {
            console.log(event);
        });

    gulp.watch(dataBaseJson.fileAll, gulp.series('buildDataBaseJson'))
        .on('change', (event) => {
            console.log(event);
        });
    callback();
});