const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const configuration = require('./configuration.js');

const folderApi = `api-js/`;
const folder = `${configuration.src + folderApi}`;
const fileAll = folder + '**/*.*';

gulp.task('buildApiJsMoveDist', function () {
    return gulp.src(fileAll)
        .pipe(gulp.dest(`${configuration.dist + folderApi}`));
});

gulp.task('buildApiJs', gulp.series(
    'buildApiJsMoveDist',
));

module.exports = {
    fileAll: fileAll,
};