const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { isProduction, path, isDeploy } = require('../gulp_options');

const distPath = isDeploy ? path.deploy.css : path.dist.css;

module.exports = () => src(path.src.styles)
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
    .pipe(dest(distPath));

// Prod: stylus + prefixes + minify + gcmq
