const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path, isDeploy } = require('../gulp_options');

const distPath = isDeploy ? path.deploy.fonts : path.dist.fonts;

module.exports = () => src(path.src.fonts)
    .pipe($.newer(distPath))
    .pipe(dest(distPath));
