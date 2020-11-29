const gulp = require('gulp');
const css = require('./css.js');
const js = require('./js.js');
const template = require('./template.js');

gulp.task('deploy', gulp.series(
        'buildCssMinify',
        'buildJsMinify',
        'buildApiJsMinify',
        'buildDataBaseJsonMinify',
        'buildTemplateMinify',
));