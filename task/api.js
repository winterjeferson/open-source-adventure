const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const configuration = require('./configuration.js');

const folderApi = `api/`;
const folder = `${configuration.development + folderApi}`;
const fileAll = folder + '**/*.*';

console.log(fileAll);

gulp.task('buildApiMoveHomologation', function () {
    return gulp.src(fileAll)
        .pipe(gulp.dest(`${configuration.homologation}${folderApi}`));
});

gulp.task('buildApiMoveProduction', function () {
    return gulp.src(fileAll)
        .pipe(gulp.dest(`${configuration.production}${folderApi}`));
});

gulp.task('buildApi', gulp.series(
    'buildApiMoveHomologation',
));

module.exports = {
    fileAll: fileAll,
};