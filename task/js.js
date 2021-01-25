const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const uglify = require("gulp-uglifyes"); //npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const eslint = require('gulp-eslint'); //npm install gulp-eslint --save-dev //https://www.npmjs.com/package/gulp-eslint
const configuration = require('./configuration.js');

const extension = 'js';
const filePrefix = `${configuration.prefix + configuration.theme}`;
const folder = `${configuration.src + extension}/`;
const file = [
    `${folder}/!(${configuration.index})*.${extension}`,
    `${folder}/${configuration.index}.${extension}`,
];
const fileName = `${filePrefix}.${extension}`;
const fileAll = folder + configuration.allFolderFile;

gulp.task('buildJsConcat', () => {
    return gulp
        .src(file)
        .pipe(concat(fileName))
        .pipe(gulp.dest(`${configuration.dist + configuration.assets + extension}/`));
});

gulp.task('buildJsLint', () => {
    return gulp
        .src(`${configuration.src + extension}/${configuration.allFolderFile}`)
        .pipe(eslint({
            "extends": "eslint:recommended",
            configFile: 'eslint.json'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('buildJsMinify', function () {
    return gulp.src(`${configuration.dist + configuration.assets + extension}/*.*`)
        .pipe(uglify())
        .pipe(gulp.dest(`${configuration.dist + configuration.assets + extension}`));
});

gulp.task('buildJs', gulp.series(
    'buildJsConcat',
    'buildJsLint',
));

module.exports = {
    fileAll: fileAll,
};