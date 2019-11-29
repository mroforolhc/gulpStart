const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulpOptions');
const isProduction = require('../gulpOptions').PRODUCTION;

module.exports = () => src(path.src.styles)
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.stylus({
        'include css': true,
    }))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Styles',
    }))
    .pipe($.if(isProduction, $.autoprefixer()))
    .pipe($.if(isProduction, $.cleanCss()))
    .pipe($.if(isProduction, $.groupCssMediaQueries()))
    .pipe($.if(!isProduction, $.sourcemaps.write('./')))
    .pipe(dest(path.dist.css));

// Dev: sourcemaps + stylus
// Prod: stylus + prefixes + minify + gcmq
