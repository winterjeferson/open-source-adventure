const gulp = require('gulp');
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const css = require('./css.js');
const image = require('./image.js');
const js = require('./js.js');
const html = require('./html.js');
const configuration = require('./configuration.js');


gulp.task('initialize', gulp.series(
    'buildCss',
    'buildJs',
    'buildApiJs',
    'buildApiPhp',
    'buildImage',
    'buildHtml',
));

gulp.task('deploy', gulp.series(
    'buildCssMinify',
    'buildJsMinify',
    'buildHtmlMinify',
));

clean = function (path) {
    del(path, {
        force: true
    });
};

exports.default = clean;