const gulp = require('gulp'); //npm install gulp-cli --global --save-dev // npm install gulp --save-dev //http://gulpjs.com
const requireDir = require('require-dir'); //npm install require-dir --save-dev // https://www.npmjs.com/package/require-dir
const tasks = requireDir('./task', {
    recurse: true
});

gulp.task('default',
    gulp.series(
        'watch',
        'initialize',
        'webserver',
    )
);
