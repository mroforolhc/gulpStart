import LazyLoad from 'vanilla-lazyload';
import svg4everybody from 'svg4everybody';
import preloadCSS from '@dotsunited/load-css-polyfill';

import FontFaceLoader from '../../includes/scripts/fonts';
import { ready } from '../../includes/scripts/no_jquery';
import Modal from '../../blocks/_global/modal/modal';
import AjaxForm from '../../includes/scripts/ajax_form';
import Events from '../../includes/scripts/events';
import createToolbar from '../../blocks/_global/toolbar/create_toolbar';
import { toggleToolbarMenu } from '../../blocks/_global/toolbar/toggle_toolbar_menu';

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

global.app = app;
app.events.on('ready', () => {
    // Polyfills
    svg4everybody();
    preloadCSS();

    // Fonts
    const fonts = new FontFaceLoader([
        { 'Open Sans': { weight: 300, style: 'normal' } },
        // Etc.
    ]);
    fonts.init();

    if (document.querySelectorAll('[data-fslightbox]').length) {
        // eslint-disable-next-line no-unused-expressions
        import(/* webpackChunkName: "fslightbox" */ 'fslightbox');
    }

    Modal.init();
    AjaxForm.init();

    const toolbarMenu = document.getElementById('toolbar-menu');
    // eslint-disable-next-line no-undef
    toolbarMenu.appendChild(buildMenu(mainMenu));
    createToolbar();
    toggleToolbarMenu();
});

ready(() => {
    app.events.emit('ready');
});
