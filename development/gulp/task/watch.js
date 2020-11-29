const gulp = require('gulp');
const css = require('./css.js');
const js = require('./js.js');
const template = require('./template.js');
const apiJs = require('./api-js.js');
const dataBaseJson = require('./data-base-json.js');

gulp.task('default', function () {
    gulp.watch(css.fileAll, gulp.series('buildCss'))
        .on('change', function (evt) {
            console.log(evt);
        });

    gulp.watch(js.fileAll, gulp.series('buildJs'))
        .on('change', function (evt) {
            console.log(evt);
        });

    gulp.watch(template.fileAll, gulp.series('buildTemplate'))
        .on('change', function (evt) {
            console.log(evt);
        });

    gulp.watch(apiJs.fileAll, gulp.series('buildApiJs'))
        .on('change', function (evt) {
            console.log(evt);
        });

    gulp.watch(dataBaseJson.fileAll, gulp.series('buildDataBaseJson'))
        .on('change', function (evt) {
            console.log(evt);
        });
});