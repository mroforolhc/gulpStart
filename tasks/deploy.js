const { src, dest } = require('gulp');

const { path } = require('../gulpOptions');

module.exports = () => src(path.deploy.src).pipe(dest(path.deploy.dist));
