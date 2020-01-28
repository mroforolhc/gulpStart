const gulp = require('gulp');

const { path } = require('../gulp_options');

module.exports = () => {
    gulp.watch(path.watch.pug, gulp.series('html'));
    gulp.watch(path.watch.styles, gulp.series('styles'));
    gulp.watch(path.watch.sprites.svg, gulp.series('sprites:svg'));
    gulp.watch(path.watch.sprites.png, gulp.series('sprites:png'));
    gulp.watch(path.watch.img, gulp.series('images'));
    gulp.watch(path.watch.fonts, gulp.series('fonts'));
};
