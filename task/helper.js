const gulp = require('gulp');
const del = require('del'); //npm install del --save-dev //https://www.npmjs.com/package/del

clean = function (path) {
    del(path, {
        force: true
    });
};

exports.default = clean;