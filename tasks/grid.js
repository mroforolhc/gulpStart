const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = () => src('src/components/grid/grid.styl')
    .pipe($.stylus())
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Grid',
    }))
    .pipe($.autoprefixer())
    .pipe($.groupCssMediaQueries())
    .pipe($.flatten())
    .pipe(dest('src/components/grid'));
