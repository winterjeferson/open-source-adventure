const gulp = require('gulp');
const concat = require('gulp-concat');//npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const uglify = require("gulp-uglifyes");//npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const configuration = require('./configuration.js');

const extension = 'js';
const folder = `${configuration.development}${extension}/`;
const fileName = `script.${extension}`;
const fileAll = [
    folder + `**/!(_)*.${extension}`,
    folder + `theme/_index.${extension}`,
];

gulp.task('buildJsConcat', function () {
    return gulp.src(fileAll)
        .pipe(concat(fileName))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildJs', gulp.series(
    'buildJsConcat',
));

gulp.task('buildJsMinify', function () {
    return gulp.src(`${configuration.homologation}${configuration.assets}${extension}/*.*`)
        .pipe(uglify())
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${extension}`));
});

module.exports = {
    fileAll: fileAll,
};