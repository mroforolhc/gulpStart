const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')({ overridePattern: false, pattern: ['imagemin-*'] });

const { isProduction, path } = require('../gulp_options');

module.exports = () => src(path.img.src, { base: 'src/' })
    .pipe($.if(isProduction, $.imagemin([
        $.imageminPngquant(),
        $.imageminMozjpeg({ quality: 90, progressive: true }),
    ])))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Images',
    }))
    .pipe(dest((file) => {
        // eslint-disable-next-line no-param-reassign
        file.path = `${file.cwd}\\${file.base}\\${file.relative.replace('\\images', '')}`;
        return path.img.dist;
    }));
