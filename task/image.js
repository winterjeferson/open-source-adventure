const gulp = require('gulp');
const imagemin = require('gulp-imagemin'); //npm install gulp-imagemin --save-dev //https://www.npmjs.com/package/gulp-imagemin/
const newer = require('gulp-newer'); //npm install gulp-newer --save-dev // https://www.npmjs.com/package/gulp-newer/
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

const configuration = require('./configuration.js');
const helper = require('./helper.js');

const folder = 'img/';
const fileAll = configuration.src + folder + configuration.allFolderFile;
const fileClean = `${configuration.dist + configuration.assets + folder}!(dynamic)*`;




gulp.task('buildImageClean', (done) => {
    clean(fileClean);
    done();
});

gulp.task('buildImageMove', (done) => {
    return gulp
        .src(fileAll)
        .pipe(gulp.dest(`${configuration.dist + configuration.assets + folder}`));
    done();
});

// fix enoent problem: node node_modules/optipng-bin/lib/install.js
gulp.task('buildImageMinify', () => {
    return gulp
        .src(`${configuration.dist + configuration.assets + folder}**`)
        .pipe(newer(`${configuration.dist + configuration.assets + folder}`))
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest(`${configuration.dist + configuration.assets + folder}`));
});

gulp.task('buildImage', gulp.series(
    'buildImageClean',
    'buildImageMove',
));

module.exports = {
    fileAll: fileAll,
};