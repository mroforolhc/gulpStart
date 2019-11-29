const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')({ overridePattern: false, pattern: ['imagemin-*'] });

const { path } = require('../gulpOptions');
const isProduction = require('../gulpOptions').PRODUCTION;

module.exports = () => src(path.src.img, { base: 'src/' })
    .pipe($.newer(path.dist.img))
    .pipe($.if(isProduction, $.imagemin([
        $.imageminPngquant(),
        $.imageminMozjpeg({ quality: 90, progressive: true }),
    ])))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Images',
    }))
    .pipe(dest(path.dist.img));
