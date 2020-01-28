const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulp_options');

module.exports = () => src(path.bootstrap.src)
    .pipe($.sass())
    .pipe(dest(path.bootstrap.dist));
