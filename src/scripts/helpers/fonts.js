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
        if (sessionStorage.fontsLoaded) {
            html.classList.add('fonts-loaded');
            // console.log('sessionStorage');
        } else {
            Promise.all(this.observers)
            // eslint-disable-next-line no-unused-vars
                .then((fonts) => {
                    html.classList.add('fonts-loaded');
                    sessionStorage.fontsLoaded = true;

                    // fonts.forEach((font) => {
                    //   console.log(`${font.family} ${font.weight} loaded`);
                    // });
                })
            // eslint-disable-next-line no-unused-vars
                .catch((err) => {
                    html.classList.add('fonts-failed');
                    // console.warn('Some critical font are not available:', err);
                });
        }
    }
}
