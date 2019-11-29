//
// Exports: PRODUCTION, path, browserSyncConfig
//

module.exports.PRODUCTION = process.env.NODE_ENV === 'production';
module.exports.DEPLOY = process.argv.includes('--deploy');

module.exports.browserSyncConfig = {
    server: {
        baseDir: './dist',
    },

    // tunnel: true,
    open: false,
    host: 'localhost',
    port: 3000,
};

module.exports.path = {
    deploy: {
        src: 'dist/assets/**/*.*',
        dist: 'public/',
    },

    dist: {
        html: 'dist/',
        js: 'dist/assets/js/',
        css: 'dist/assets/css/',
        img: 'dist/assets/',
        fonts: 'dist/assets/fonts/',
        bootstrap: 'src/assets/styles/css/',
        sprites: 'dist/assets/images/sprites/',
    },

    src: {
        pug: 'src/pug/pages/*.pug',
        styles: ['src/styles/global.styl', 'src/styles/pages/*.styl'],
        js: ['src/scripts/global.js', 'src/scripts/pages/*.js'],
        img: ['src/images/**/*.*', 'src/uploads/**/*.*'],
        sprites: {
            svg: 'src/sprites/**/*.svg',
            png: ['src/sprites/**/*.png', '!src/sprites/*.png'],
            styles: 'src/styles/sprites/',
        },
        fonts: 'src/fonts/**/*.*',
        bootstrap: 'src/styles/bootstrap/bootstrap.scss',
    },

    watch: {
        pug: 'src/pug/**/*.*',
        styles: 'src/styles/**/*.{styl,css}',
        img: ['src/images/**/*.*', 'src/uploads/**/*.*'],
        fonts: 'src/fonts/**/*.*',
        sprites: {
            png: 'src/sprites/**/*.png',
            svg: 'src/sprites/**/*.svg',
        },
    },

    clean: ['./dist', './src/styles/sprites'],
};
