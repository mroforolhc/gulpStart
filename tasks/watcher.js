const gulp = require('gulp');

const { path } = require('../gulp_options');

module.exports = () => {
    gulp.watch(path.html.watch, gulp.series('html'));
    gulp.watch(path.css.watch, gulp.series('styles'));
    gulp.watch(path.js.watch, gulp.series('webpack'));
    gulp.watch(path.sprites.svg.watch, gulp.series('sprites:svg'));
    gulp.watch(path.sprites.png.watch, gulp.series('sprites:png'));
    gulp.watch(path.img.watch, gulp.series('images'));
    gulp.watch(path.fonts.watch, gulp.series('fonts'));
};
