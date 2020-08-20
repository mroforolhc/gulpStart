const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulp_options');

const imgPathInCss = '../images/sprites';

module.exports = (cb) => {
    const spriteData = src(path.sprites.png.src)
        .pipe($.spritesmithMulti({
            spritesmith: (options) => {
                options.imgPath = imgPathInCss + options.imgName;
                options.cssName = options.cssName.replace(/\.css$/, '.styl');
                options.cssTemplate = null;
                options.padding = 10;
            },
        }))
        .on('error', $.notify.onError({
            message: '<%= error.message %>',
            title: 'Png sprites',
        }));

    spriteData.img.pipe(dest(path.sprites.dist));
    spriteData.css.pipe(dest(path.sprites.styles));

    return cb();
};
