import LazyLoad from 'vanilla-lazyload';
import svg4everybody from 'svg4everybody';
import preloadCSS from '@dotsunited/load-css-polyfill';

import FontFaceLoader from '../../includes/scripts/fonts';
import BreakpointChecker from '../../includes/scripts/breakpoint_checker';
import { ready } from '../../includes/scripts/no_jquery';
import AjaxForm from '../../includes/scripts/ajax_form';
import Events from '../../includes/scripts/events';
import createPopover from '../../includes/scripts/create_popover';

import createToolbar from '../../blocks/_global/toolbar/create_toolbar';
import { toggleToolbarMenu } from '../../blocks/_global/toolbar/toggle_toolbar_menu';
import Modal from '../../blocks/_global/modal/modal';

const app = {
    events: new Events(),
    settings: {},
    lazyLoader: new LazyLoad({
        class_loading: 'lazy-loading',
        class_loaded: 'lazy-loaded',
        class_error: 'lazy-error',
        class_initial: 'lazy-initial',
        elements_selector: '.lazy',
    }),
    import(name) {
        const modules = {
            velocity() {
                return import(/* webpackChunkName: "velocity" */ 'velocity-animate');
            },
            fslightbox() {
                return import(/* webpackChunkName: "fslightbox" */ 'fslightbox');
            },
        };
        return modules[name]();
    },
    cPopover: createPopover,
    refreshFsLightbox: () => {
        app.import('fslightbox').then(() => {
            refreshFsLightbox();
        });
    },
};

global.app = app;
global.Events = Events;
global.BreakpointChecker = new BreakpointChecker();

app.events.on('ready', () => {
    // Polyfills
    svg4everybody();
    preloadCSS();

    // Fonts
    const fonts = new FontFaceLoader([
        { 'Open Sans': { weight: 300, style: 'normal' } },
        // Etc.
    ]);
    fonts.init().then(() => {
        app.events.emit('fonts-loaded');
    });

    if (document.querySelectorAll('[data-fslightbox]').length) {
        app.refreshFsLightbox();
    }

    Modal.init();
    AjaxForm.init();

    createToolbar();
    toggleToolbarMenu();
});

ready(() => {
    app.events.emit('ready');
});
