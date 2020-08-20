require('dotenv').config();
const gulp = require('gulp');

function lazyRequireTask(taskName, path) {
    gulp.task(taskName, (callback) => {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const task = require(path);
        return task(callback);
    });
}

lazyRequireTask('clean', './tasks/clean');
lazyRequireTask('html', './tasks/html');
lazyRequireTask('bootstrap', './tasks/bootstrap');
lazyRequireTask('styles', './tasks/styles');
lazyRequireTask('images', './tasks/images');
lazyRequireTask('fonts', './tasks/fonts');
lazyRequireTask('sprites:png', './tasks/sprites_png');
lazyRequireTask('sprites:svg', './tasks/sprites_svg');
lazyRequireTask('webpack', './tasks/webpack');

lazyRequireTask('webserver', './tasks/webserver');
lazyRequireTask('grid', './tasks/grid');
lazyRequireTask('watcher', './tasks/watcher');
lazyRequireTask('deploy', './tasks/deploy');
lazyRequireTask('deployWatcher', './tasks/deployWatcher');

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sprites:png', 'sprites:svg', 'images', 'fonts'),
    gulp.parallel('styles', 'html', 'webpack'),
));

gulp.task('dev', gulp.parallel('watcher', 'webserver'));

exports.default = gulp.series('build');
