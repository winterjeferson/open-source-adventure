const gulp = require('gulp');
const sass = require('gulp-sass'); //npm install gulp-sass --save-dev // https://www.npmjs.com/package/gulp-sass/
const rename = require("gulp-rename"); //npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
const csso = require('gulp-csso'); //npm install gulp-csso --save-dev //https://www.npmjs.com/package/gulp-csso/
const gulpStylelint = require('gulp-stylelint'); //npm install stylelint gulp-stylelint --save-dev //https://www.npmjs.com/package/gulp-stylelint

const configuration = require('./configuration.js');

const extension = 'css';
const extensionSass = `s${extension}`;
const filePrefix = `${configuration.prefix + configuration.theme}`;
const folder = `${configuration.src + extension}/`;
const file = folder + `${filePrefix}/${configuration.index}.${extensionSass}`;
const fileName = `${filePrefix}.${extension}`;
const fileAll = folder + configuration.allFolderFile;

gulp.task('buildCssMinify', function () {
    return gulp
        .src(`${configuration.dist + configuration.assets + extension}/*.*`)
        .pipe(csso())
        .pipe(gulp.dest(`${configuration.dist + configuration.assets + extension}/`));
});

gulp.task('buildCssSass', function () {
    return gulp
        .src(file)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename(fileName))
        .pipe(gulp.dest(`${configuration.dist + configuration.assets + extension}/`));
});

gulp.task('buildCssLint', function lintCssTask(done) {
    return gulp
        .src(fileAll)
        .pipe(gulpStylelint({
            failAfterError: true,
            reporters: [{
                formatter: 'verbose',
                console: true
            }, ],
            debug: true
        }));
    done();
});


gulp.task('buildCss', gulp.series(
    'buildCssLint',
    'buildCssSass',
));

module.exports = {
    fileAll: fileAll,
};