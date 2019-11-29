import LazyLoad from 'vanilla-lazyload';

import FontFaceLoader from './helpers/fonts';
import Modal from './helpers/modal';
import AjaxForm from './helpers/ajax-form';
import Events from './helpers/events';

const app = {
    events: new Events(),
    lazyLoader: new LazyLoad({
        class_loading: 'lazy-loading',
        class_loaded: 'lazy-loaded',
        class_error: 'lazy-error',
        class_initial: 'lazy-initial',
        elements_selector: '.lazy',
    }),
    modal: Modal,
};

window.app = app;

app.events.on('ready', () => {
    if (document.querySelectorAll('[data-fslightbox]').length) {
        import(/* webpackChunkName: "fslightbox" */ 'fslightbox');
    }

    import(/* webpackChunkName: "svg4everybody" */ 'svg4everybody').then(({ default: svg4everybody }) => {
        svg4everybody();
    });

    import(/* webpackChunkName: "load-css-polyfill" */ '@dotsunited/load-css-polyfill').then(({ default: preloadCSS }) => {
        preloadCSS();
    });

    // Fonts
    const fonts = new FontFaceLoader([
        { 'Open Sans': { weight: 300, style: 'normal' } },
        { 'Open Sans': { weight: 700, style: 'normal' } },
        // Etc.
    ]);
    fonts.init();

    Modal.init();
    AjaxForm.init();
});

document.addEventListener('DOMContentLoaded', () => {
    app.events.emit('ready');
});
