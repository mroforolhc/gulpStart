const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();

const { path } = require('../gulp_options');

module.exports = () => src(path.deploy.from)
    .pipe($.changed(path.deploy.to))
    .pipe(dest(path.deploy.to));
