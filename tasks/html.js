const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulp_options');

module.exports = () => src(path.html.src)
    .pipe($.pug({ pretty: true, cache: true }))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Pug',
    }))
    .pipe($.flatten())
    .pipe(dest(path.html.dist));
