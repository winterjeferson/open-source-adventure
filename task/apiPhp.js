const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const configuration = require('./configuration.js');

const folderApi = `api-php/`;
const folder = `${configuration.src + folderApi}`;
const fileAll = folder + '**/*.*';

gulp.task('buildApiPhpMoveDist', function () {
    return gulp.src(fileAll)
        .pipe(gulp.dest(`${configuration.dist + folderApi}`));
});

gulp.task('buildApiPhp', gulp.series(
    'buildApiPhpMoveDist',
));

module.exports = {
    fileAll: fileAll,
};