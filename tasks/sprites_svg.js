const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path, isDeploy } = require('../gulp_options');

const distPath = isDeploy ? path.deploy.sprites : path.dist.sprites;

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
            return distPath;
        } return path.src.sprites.styles;
    }));