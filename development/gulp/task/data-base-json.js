const gulp = require('gulp');
const concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const jsonmin = require('gulp-jsonmin');//npm install gulp-jsonmin --save-dev //https://www.npmjs.com/package/gulp-jsonmin
const configuration = require('./configuration.js');

const extension = 'json';
const name = `data-base`;
const folderDataBase = `${name}/`;
const folder = `${configuration.development}${folderDataBase}${extension}/`;
const fileAll = folder + `*.${extension}`;

gulp.task('buildDataBaseJsonMove', function (done) {
    return gulp
        .src(fileAll)
        .pipe(gulp.dest(`${configuration.homologation}${folderDataBase}${extension}`));
    done();
});
gulp.task('buildDataBaseJson', gulp.series(
    'buildDataBaseJsonMove',
));

gulp.task('buildDataBaseJsonMinify', function () {
    return gulp.src(`${configuration.homologation}${folderDataBase}${extension}/*.*`)
        .pipe(jsonmin())
        .pipe(gulp.dest(`${configuration.production}${folderDataBase}${extension}`));
});

module.exports = {
    fileAll: fileAll,
};