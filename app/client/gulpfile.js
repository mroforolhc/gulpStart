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
lazyRequireTask('sprites:png', './tasks/spritesPng');
lazyRequireTask('sprites:svg', './tasks/spritesSvg');
lazyRequireTask('sprites:svg', './tasks/spritesSvg');
lazyRequireTask('webpack', './tasks/webpack');

lazyRequireTask('deploy', './tasks/deploy');
lazyRequireTask('webserver', './tasks/webserver');
lazyRequireTask('watcher', './tasks/watcher');


gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sprites:png', 'sprites:svg', 'images', 'fonts'),
    gulp.parallel('styles', 'html'),
));

gulp.task('dev', gulp.parallel('webserver', 'watcher'));
gulp.task('default', gulp.series('build', 'dev'));
