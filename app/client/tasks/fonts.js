const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulpOptions');

module.exports = () => src(path.src.fonts)
    .pipe($.newer(path.dist.fonts))
    .pipe(dest(path.dist.fonts));
