const deploy = '../../public/';
const dist = 'dist/';

module.exports.isProduction = (process.env.NODE_ENV ? process.env.NODE_ENV.trim().toLowerCase() : '') === 'production';
module.exports.browserSyncConfig = {
    server: {
        baseDir: './dist',
    },
    open: false,
    injectChanges: false,
    logFileChanges: false,
    host: 'localhost',
    port: 3000,
};

module.exports.path = {
    clean: './dist',
    dist,

    deploy: {
        from: `${dist}/assets/**/*.*`,
        to: deploy,
    },

    fonts: {
        src: 'src/components/typography/fonts/**/*.*',
        watch: 'src/components/typography/fonts/**/*.*',
        dist: `${dist}/assets/fonts`,
        deploy: `${deploy}/assets/fonts`,
    },

    html: {
        src: 'src/pages/**/*.pug',
        watch: 'src/{app,pages,components}/**/*.pug',
        dist,
    },

    css: {
        src: ['src/app/app.styl', 'src/pages/**/*.styl'],
        watch: 'src/{app,pages,components}/**/*.{styl,css}',
        dist: `${dist}assets/css/`,
        deploy: `${deploy}assets/css/`,
    },

    js: {
        src: ['src/app/app.js', 'src/pages/**/*.js'],
        watch: 'src/{app,pages,components}/**/*.{js,json}',
        dist: `${dist}assets/js/`,
        deploy: `${deploy}assets/js/`,
        publicPath: '/assets/js/',
    },

    img: {
        src: 'src/{components,pages}/**/*.{jpg,png,svg,gif}',
        watch: 'src/{pages,components}/**/*.{jpg,png,svg,gif}',
        dist: `${dist}assets/images/`,
        deploy: `${deploy}assets/images/`,
    },

    sprites: {
        svg: {
            src: 'src/app/sprites/**/*.svg',
            watch: 'src/app/sprites/**/*.svg',
        },
        png: {
            src: 'src/app/sprites/**/*.png',
            watch: 'src/app/sprites/**/*.png',
        },
        styles: 'src/app/sprites/styles',
        dist: `${dist}assets/images/sprites/`,
        deploy: `${deploy}assets/images/sprites/`,
    },
};
