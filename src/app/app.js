import LazyLoad from 'vanilla-lazyload';
import svg4everybody from 'svg4everybody';
import preloadCSS from '@dotsunited/load-css-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { observable, reaction } from 'mobx';
import jsonSettings from './_settings.json';
import Manager from '../components/manager/manager';
import Grid from '../components/grid/grid';
import Fonts from '../components/typography/fonts';
import Modal from '../components/modal/modal';

class App {
    @observable isLoadPage = false;

    constructor(settings) {
        this.settings = settings;
        this.manager = new Manager();

        this.manager.spy(
            new Grid('grid', this.settings.grid),
            new Fonts('fonts', this.settings.fonts),
            new Modal('modal'),
        );
    }

    start() {
        this.manager.run();
        this.isLoadPage = true;
    }
}

const app = new App(jsonSettings);
global.app = app;

document.addEventListener('DOMContentLoaded', () => {
    app.start();
});

reaction(
    () => app.manager.getState('fonts').isLoaded,
    () => console.log('Fonts is loaded'),
);

reaction(
    () => app.manager.getState('grid').currentScale,
    (scale) => console.log(scale.size),
);

reaction(
    () => app.isLoadPage,
    () => console.log('Page is loaded'),
);
