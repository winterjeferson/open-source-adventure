const gulp = require('gulp');
const concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const uglify = require("gulp-uglifyes");//npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const configuration = require('./configuration.js');

const extension = 'js';
const name = 'api';
const folderApi = `${name}/`;
const folder = `${configuration.development}${folderApi}${extension}/`;
const fileName = `${name}.${extension}`;
const fileAll = [
    folder + `**/!(_)*.${extension}`,
    folder + `_index.${extension}`,
];

gulp.task('buildApiJsConcat', function () {
    return gulp.src(fileAll)
        .pipe(concat(fileName))
        .pipe(gulp.dest(`${configuration.homologation}${folderApi}${extension}/`));
});

gulp.task('buildApiJs', gulp.series(
    'buildApiJsConcat',
));

gulp.task('buildApiJsMinify', function () {
    return gulp.src(`${configuration.homologation}${folderApi}${extension}/*.*`)
        .pipe(uglify())
        .pipe(gulp.dest(`${configuration.production}${folderApi}${extension}`));
});

module.exports = {
    fileAll: fileAll,
};