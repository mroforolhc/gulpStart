import LazyLoad from 'vanilla-lazyload';
import svg4everybody from 'svg4everybody';
import preloadCSS from '@dotsunited/load-css-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { observable, reaction } from 'mobx';
import jsonSettings from './settings.json';
import Manager from '../components/manager/manager';
import Grid from '../components/grid/grid';
import Fonts from '../components/typography/fonts';
import Modal from '../components/modal/modal';
import Forms from '../components/forms/forms';

class App {
    @observable isLoadPage = false;

    constructor(settings) {
        this.settings = settings;
        this.manager = new Manager();

        this.manager.spy(
            new Grid('grid', this.settings.grid),
            new Fonts('fonts', this.settings.fonts),
            new Forms('forms'),
            new Modal('modal'),
        );
    }

    start() {
        this.manager.run();
        this.isLoadPage = true;
    }
}

const main = new App(jsonSettings);
global.main = main;

document.addEventListener('DOMContentLoaded', () => {
    main.start();
});

reaction(
    () => main.manager.getState('fonts').isLoaded,
    () => console.log('Fonts is loaded'),
);

reaction(
    () => main.manager.getState('grid').currentScale,
    (scale) => console.log(scale.size),
);

reaction(
    () => main.isLoadPage,
    () => console.log('Page is loaded'),
);
