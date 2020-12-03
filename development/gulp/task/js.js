const gulp = require('gulp');
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev //https://www.npmjs.com/package/gulp-concat/
const uglify = require("gulp-uglifyes"); //npm install gulp-uglifyes --save-dev //https://www.npmjs.com/package/gulp-uglifyes
const eslint = require('gulp-eslint'); //npm install gulp-eslint --save-dev //https://www.npmjs.com/package/gulp-eslint
const configuration = require('./configuration.js');

const extension = 'js';
const filePrefix = `${configuration.prefix}${configuration.theme}`;
const folder = `${configuration.development}${extension}/`;
const file = `${folder}${filePrefix}/${configuration.allFolderFile}`;
const fileName = `${filePrefix}.${extension}`;
const fileAll = folder + configuration.allFolderFile;

gulp.task('buildJsConcat', () => {
    return gulp
        .src(file)
        .pipe(concat(fileName))
        .pipe(gulp.dest(`${configuration.homologation}${configuration.assets}${extension}/`));
});

gulp.task('buildJsLint', () => {
    return gulp
        .src(`${configuration.development}${extension}/${configuration.allFolderFile}`)
        .pipe(eslint({
            'extends': 'eslint:recommended',
            'rules': {
                'quotes': [1, 'single'],
                'semi': [1, 'always'],
                'eqeqeq': [1, 'always'],
                'no-alert': 1,
                'no-eval': 1,
                'no-var': 1,
                'no-redeclare': 1,
                'no-self-compare': 1,
                'no-unused-vars': [1, {
                    'vars': 'all',
                    'args': 'after-used',
                    'ignoreRestSiblings': false
                }],
            },
            'parserOptions': {
                'ecmaVersion': 6,
                'sourceType': 'module',
                'ecmaFeatures': {
                    'jsx': true
                }
            },
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('buildJsMinify', function () {
    return gulp.src(`${configuration.homologation}${configuration.assets}${extension}/*.*`)
        .pipe(uglify())
        .pipe(gulp.dest(`${configuration.production}${configuration.assets}${extension}`));
});

gulp.task('buildJs', gulp.series(
    'buildJsConcat',
    'buildJsLint',
));

module.exports = {
    fileAll: fileAll,
};