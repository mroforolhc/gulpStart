const webpackStream = require('webpack-stream');
const { src, dest } = require('gulp');
const $ = require('gulp-load-plugins')();
const named = require('vinyl-named');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { webpack } = webpackStream;

const { path, isProduction } = require('../gulp_options');

const options = {
    output: {
        library: '[name]',
        publicPath: path.js.publicPath,
    },
    mode: isProduction ? 'production' : 'development',
    watch: false,
    stats: {
        builtAt: false,
    },
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
    plugins: [
        // new BundleAnalyzerPlugin({
        //     generateStatsFile: true,
        //     openAnalyzer: false,
        //     analyzerMode: 'disabled',
        // }),
    ],
    performance: {
        maxEntrypointSize: 300000,
    },
};

module.exports = () => src(path.js.src)
    .pipe($.plumber({
        errorHandler: $.notify.onError((err) => ({
            title: 'Webpack',
            message: err.message,
        })),
    }))
    .pipe(named())
    .pipe(webpackStream(options))
    .pipe(dest(path.js.dist));
