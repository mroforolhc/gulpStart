const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulpOptions');

module.exports = () => src(path.src.pug)
    .pipe($.pug({ pretty: true, cache: true }))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Pug',
    }))
    .pipe(dest(path.dist.html));
