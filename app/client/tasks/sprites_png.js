const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path, isDeploy } = require('../gulp_options');

const distPath = isDeploy ? path.deploy.sprites : path.dist.sprites;

const imgPathInCss = '../images/sprites';
const template = 'src/includes/sprites/stylus.template.handlebars';

module.exports = () => src(path.src.sprites.png)
    .pipe($.spritesmithMulti({
        spritesmith: (options) => {
            options.imgPath = imgPathInCss + options.imgName;
            options.cssName = options.cssName.replace(/\.css$/, '.styl');
            options.cssTemplate = template;
            options.padding = 10;
        },
    }))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Png sprites',
    }))
    .pipe(dest((file) => {
        if (file.extname === '.png') {
            return distPath;
        } return path.src.sprites.styles;
    }));
