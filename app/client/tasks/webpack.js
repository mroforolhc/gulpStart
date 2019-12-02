const webpackStream = require('webpack-stream');
const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();
const gulplog = require('gulplog');
const named = require('vinyl-named');

// const { webpack } = webpackStream;

const { path } = require('../gulpOptions');
const isProduction = require('../gulpOptions').PRODUCTION;

const options = {
    output: {
        library: '[name]',
        publicPath: '/assets/js/',
    },
    mode: isProduction ? 'production' : 'development',
    watch: !isProduction,
    module: {
        rules: [{
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: { version: 3, proposals: false },
                            modules: false,
                            loose: true,
                        },
                    ],
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
            exclude: /node_modules/,
        }],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                polyfills: {
                    test: /[\\/]core-js[\\/]/,
                    name: 'polyfills',
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
    },
};

module.exports = (callback) => {
    let firstBuild = false;

    function done(err, stats) {
        firstBuild = true;
        if (err) {
            return;
        }
        gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            colors: true,
        }));
    }

    return src(path.src.js)
        .pipe($.plumber({
            errorHandler: $.notify.onError((err) => ({
                title: 'Webpack',
                message: err.message,
            })),
        }))
        .pipe(named())
        .pipe(webpackStream(options, null, done))
        .pipe(dest(path.dist.js))
        .on('data', () => {
            if (firstBuild) {
                callback();
            }
        });
};
