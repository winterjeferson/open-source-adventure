var gulp = require('gulp'); //npm install gulp-cli --global --save-dev // npm install gulp --save-dev //http://gulpjs.com
var requireDir = require('require-dir'); //npm install require-dir --save-dev // https://www.npmjs.com/package/require-dir
var tasks = requireDir('./task', {recurse: true});