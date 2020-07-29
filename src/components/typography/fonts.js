import FontFaceObserver from 'fontfaceobserver';
import { action, observable } from 'mobx';
import BaseComponent from '../baseComponent/baseComponent';

class FontsState {
    observers = [];

    @observable isLoaded = false;
}

class Fonts extends BaseComponent {
    constructor(name, settings) {
        super(name);
        this.state = new FontsState();

        this.addFonts(settings);
    }

    addFonts(fonts) {
        fonts.forEach((font) => {
            const obs = new FontFaceObserver(Object.keys(font)[0], Object.values(font)[0]);
            this.state.observers.push(obs.load('ёыйшъьqzj', 10000));
        });
    }

    init() {
        const html = document.documentElement;
        Promise.all(this.state.observers).then(
            action((fonts) => {
                html.classList.add('fonts-loaded');
                fonts.forEach((font) => {
                    console.log(`${font.family} ${font.weight} loaded`);
                });
                this.state.isLoaded = true;
            }),
            () => {
                html.classList.add('fonts-failed');
            },
        );
    }
}

export default Fonts;
