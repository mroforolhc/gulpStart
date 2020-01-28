const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')({ overridePattern: false, pattern: ['imagemin-*'] });

const { isProduction, path, isDeploy } = require('../gulp_options');

const distPathImg = isDeploy ? path.deploy.img : path.dist.img;
const distPathUploads = isDeploy ? path.deploy.uploads : path.dist.uploads;

module.exports = () => src(path.src.img, { base: 'src/' })
    .pipe($.if(isProduction, $.imagemin([
        $.imageminPngquant(),
        $.imageminMozjpeg({ quality: 90, progressive: true }),
    ])))
    .on('error', $.notify.onError({
        message: '<%= error.message %>',
        title: 'Images',
    }))
    .pipe(dest((file) => {
        if (file.relative.includes('\\uploads\\')) {
            file.path = `${file.cwd}\\${file.base}\\${file.relative.replace('\\uploads', '')}`;
            return distPathUploads;
        }

        file.path = `${file.cwd}\\${file.base}\\${file.relative.replace('\\images', '')}`;
        return distPathImg;
    }));
