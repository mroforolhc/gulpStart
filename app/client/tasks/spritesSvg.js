const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulpOptions');

module.exports = () => src(path.src.sprites.svg)
    .pipe($.svgSymbols({
        title: false,
        id: 'svg_%f',
        templates: ['default-stylus', 'default-svg'],
    }))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Png sprites',
    }))
    .pipe(dest((file) => {
        if (file.extname === '.svg') {
            return path.dist.sprites;
        } return path.src.sprites.styles;
    }));
