const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulp_options');

module.exports = () => src(path.deploy.src)
    .pipe($.changed(path.deploy.dist))
    .pipe(dest(path.deploy.dist));
