const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render'); //npm install gulp-nunjucks-render --save-dev // https://zellwk.com/blog/nunjucks-with-gulp/
const rename = require("gulp-rename");//npm install gulp-rename --save-dev // https://www.npmjs.com/package/gulp-rename/
const htmlmin = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev  //https://www.npmjs.com/package/gulp-htmlmin/
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del
const configuration = require('./configuration.js');

const extension = 'html';
const folder = `${configuration.development}template/`;
const file = [
    folder + `index.${extension}`,
];
const fileAll = [
    folder + '**/*.*',
];

function clean(path) {
    return del(path, { force: true });
}

gulp.task('buildTemplateClean', function () {
    const files = [
        `${configuration.homologation}*.${extension}`,
    ];
    return clean(files);
});

gulp.task('buildTemplateInclude', function () {
    return gulp
        .src(file)
        .pipe(nunjucksRender({
            path: [folder]
        }))
        .pipe(rename({ extname: `.${extension}` }))
        .pipe(gulp.dest(configuration.homologation));
});

gulp.task('buildTemplateMinify', function () {
    return gulp
        .src(`${configuration.homologation}*.${extension}`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(configuration.production));
});

gulp.task('buildTemplate', gulp.series(
    'buildTemplateClean',
    'buildTemplateInclude',
));





module.exports = {
    fileAll: fileAll,
};