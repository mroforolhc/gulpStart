module.exports.isProduction = (process.env.NODE_ENV ? process.env.NODE_ENV.trim().toLowerCase() : '') === 'production';
module.exports.isWatch = process.argv.includes('--watch');
module.exports.isDeploy = process.argv.includes('--deploy');

module.exports.browserSyncConfig = {
    server: {
        baseDir: './dist',
    },

    // tunnel: true,
    open: false,
    injectChanges: false,
    logFileChanges: false,
    host: 'localhost',
    port: 3000,
};

module.exports.path = {
    deploy: {
        src: 'dist/assets/**/*.*',
        dist: '../../public/',
        js: '../../public/assets/js/',
        css: '../../public/assets/css/',
        img: '../../public/assets/images/',
        uploads: '../../public/assets/images/uploads/',
        fonts: '../../public/assets/fonts/',
        sprites: '../../public/assets/images/sprites/',
    },

    dist: {
        html: 'dist/',
        js: 'dist/assets/js/',
        css: 'dist/assets/css/',
        img: 'dist/assets/images/',
        uploads: 'dist/assets/images/uploads/',
        fonts: 'dist/assets/fonts/',
        sprites: 'dist/assets/images/sprites/',
    },

    src: {
        pug: 'src/pages/**/*.pug',
        styles: 'src/pages/**/*.styl',
        js: 'src/pages/**/*.js',
        img: ['src/{blocks,pages}/**/*.{jpg,png,svg,gif}'],
        sprites: {
            svg: 'src/includes/sprites/**/*.svg',
            png: ['src/includes/sprites/**/*.png', '!src/includes/sprites/*.png'],
            styles: 'src/includes/styles/sprites/',
        },
        fonts: 'src/includes/fonts/**/*.*',
    },

    watch: {
        pug: ['src/pages/**/*.pug', 'src/blocks/**/*.pug'],
        styles: ['src/pages/**/*.{styl,css}', 'src/blocks/**/*.styl'],
        img: ['src/{blocks,pages}/**/*.{jpg,png,svg,gif}'],
        fonts: 'src/includes/fonts/**/*.*',
        sprites: {
            png: 'src/includes/sprites/**/*.png',
            svg: 'src/includes/sprites/**/*.svg',
        },
    },

    bootstrap: {
        src: 'src/includes/styles/bootstrap/bootstrap.scss',
        dist: 'src/includes/styles/css/',
    },

    clean: ['./dist', './src/includes/styles/sprites'],
};
