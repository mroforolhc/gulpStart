const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulp_options');

module.exports = () => src(path.sprites.svg.src)
    .pipe($.svgSymbols({
        title: false,
        id: '%f',
        templates: ['default-stylus', 'default-svg'],
    }))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Svg sprites',
    }))
    .pipe(dest((file) => {
        if (file.extname === '.svg') return path.sprites.dist;
        return path.sprites.styles;
    }));
