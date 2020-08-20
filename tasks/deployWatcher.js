const gulp = require('gulp');

const { path } = require('../gulp_options');

module.exports = () => {
    gulp.watch(path.html.watch, gulp.series('html', 'deploy'));
    gulp.watch(path.css.watch, gulp.series('styles', 'deploy'));
    gulp.watch(path.js.watch, gulp.series('webpack', 'deploy'));
    gulp.watch(path.sprites.svg.watch, gulp.series('sprites:svg', 'deploy'));
    gulp.watch(path.sprites.png.watch, gulp.series('sprites:png', 'deploy'));
    gulp.watch(path.img.watch, gulp.series('images', 'deploy'));
    gulp.watch(path.fonts.watch, gulp.series('fonts', 'deploy'));
};
