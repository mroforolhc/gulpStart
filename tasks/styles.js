const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { isProduction, path } = require('../gulp_options');

module.exports = () => src(path.css.src)
    .pipe($.stylus({
        'include css': true,
    }))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Styles',
    }))
    .pipe($.autoprefixer())
    .pipe($.groupCssMediaQueries())
    .pipe($.if(isProduction, $.cleanCss()))
    .pipe($.flatten())
    .pipe(dest(path.css.dist));
