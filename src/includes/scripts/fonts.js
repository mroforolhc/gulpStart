import FontFaceObserver from 'fontfaceobserver';

export default class FontFaceLoader {
    constructor(fontData) {
        this.observers = [];

        for (let i = 0; i < fontData.length; i += 1) {
            const objFont = fontData[i];
            const fontName = Object.keys(objFont);

            const data = Object.keys(objFont).map((e) => objFont[e]);
            const obs = new FontFaceObserver(fontName[0], data[0]);
            this.observers.push(obs.load(null, 10000));
        }
    }

    init() {
        const html = document.documentElement;
        return Promise.all(this.observers)
            .then(() => {
                html.classList.add('fonts-loaded');
                sessionStorage.fontsLoaded = true;
            })
            .catch(() => {
                html.classList.add('fonts-failed');
            });
    }
}
