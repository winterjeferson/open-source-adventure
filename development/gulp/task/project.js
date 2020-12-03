const gulp = require('gulp');

const css = require('./css.js');
const image = require('./image.js');
const js = require('./js.js');
const project = require('./project.js');
const template = require('./template.js');
const configuration = require('./configuration.js');


gulp.task('initialize', gulp.series(
    'buildCss',
    'buildJs',
    'buildImage',
    'buildTemplate',
));

gulp.task('deploy', gulp.series(
    'buildCssMinify',
    'buildJsMinify',
    'buildApiJsonMinify',
    'buildDataBaseJsonMinify',
    'buildTemplateMinify',
));