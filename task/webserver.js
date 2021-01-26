const gulp = require('gulp');
const webserver = require('gulp-webserver'); //npm install --save-dev gulp-webserver //https://www.npmjs.com/package/gulp-webserver

const configuration = require('./configuration.js');

gulp.task('webserver', () => {
    gulp.src(configuration.dist)
        .pipe(webserver({
            port: configuration.port,
            livereload: true,
            host: configuration.ip,
            open: true,
        }))
});