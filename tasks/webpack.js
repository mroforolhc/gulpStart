const webpackStream = require('webpack-stream');
const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();
const gulplog = require('gulplog');
const named = require('vinyl-named');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const { webpack } = webpackStream;

const {
    path,
    isProduction,
    isWatch,
    isDeploy,
} = require('../gulp_options');

const distPath = isDeploy ? path.deploy.js : path.dist.js;

const options = {
    output: {
        library: '[name]',
        publicPath: isDeploy ? path.deploy.publicPath : path.dist.publicPath,
    },
    mode: isProduction ? 'production' : 'development',
    watch: isWatch,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules(?!([\\/])(swiper|dom7))/,
                use: {
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
                            '@babel/preset-react',
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                        ],
                    },
                },
            },
        ],
    },
    plugins: !isWatch ? [
        new BundleAnalyzerPlugin({
            generateStatsFile: true,
            openAnalyzer: false,
            analyzerMode: 'disabled',
        }),
    ] : [],
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
        .pipe(dest(distPath))
        .on('data', () => {
            if (firstBuild) {
                callback();
            }
        });
};
