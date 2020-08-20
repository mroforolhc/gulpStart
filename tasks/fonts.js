const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulp_options');

module.exports = () => src(path.fonts.src)
    .pipe($.newer(path.fonts.dist))
    .pipe(dest(path.fonts.dist));
