const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulpOptions');

module.exports = () => src(path.src.bootstrap)
    .pipe($.sass())
    .pipe(dest(path.dist.bootstrap));
