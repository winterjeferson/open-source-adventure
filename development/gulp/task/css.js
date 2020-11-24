const gulp = require('gulp');
const sass = require('gulp-sass');//npm install gulp-sass --save-dev // https://www.npmjs.com/package/gulp-sass/
const rename = require("gulp-rename");//npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
const csso = require('gulp-csso');//npm install gulp-csso --save-dev //https://www.npmjs.com/package/gulp-csso/
const configuration = require('./configuration.js');

const extension = 'css';
const folder = `${configuration.development}${extension}/`;
const file = [
    folder + `theme/index.s${extension}`,
];
const fileName = `style.${extension}`;
const fileAll = [
    folder + '**/*.*',
];

gulp.task('buildCssMinify', function () {
    return gulp
        .src(`${configuration.homologation}${configuration.assets}${extension}/*.*`)
        .pipe(csso())
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${extension}/`));
});

gulp.task('buildCssSass', function () {
    return gulp
        .src(file)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename(fileName))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildCss', gulp.series(
    'buildCssSass',
));

module.exports = {
    fileAll: fileAll,
};