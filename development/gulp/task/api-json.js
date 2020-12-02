const gulp = require('gulp');
const concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const jsonmin = require('gulp-jsonmin');//npm install gulp-jsonmin --save-dev //https://www.npmjs.com/package/gulp-jsonmin
const configuration = require('./configuration.js');

const extension = 'json';
const name = 'api';
const folderApi = `${name}/`;
const folder = `${configuration.development}${folderApi}${extension}/`;
const fileAll = folder + '**/*.*';

gulp.task('buildApiJsonMove', function () {
    return gulp.src(fileAll)
        .pipe(gulp.dest(`${configuration.homologation}${folderApi}${extension}/`));
});

gulp.task('buildApiJson', gulp.series(
    'buildApiJsonMove',
));

gulp.task('buildApiJsonMinify', function () {
    return gulp.src(`${configuration.homologation}${folderApi}${extension}/*.*`)
        .pipe(jsonmin())
        .pipe(gulp.dest(`${configuration.production}${folderApi}${extension}`));
});

module.exports = {
    fileAll: fileAll,
};