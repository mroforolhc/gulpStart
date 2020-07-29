let el;
let inited = false;

const Loader = {
    show() {
        this.init();
        if (el) {
            app.import('velocity').then(({ default: Velocity }) => {
                Velocity(el, 'fadeIn', { duration: 300 });
            });
        }
    },
    hide() {
        if (el) {
            app.import('velocity').then(({ default: Velocity }) => {
                Velocity(el, 'fadeOut', { duration: 300 });
            });
        }
    },
    init() {
        if (!inited) {
            el = document.getElementById('loader');
            if (!el) {
                el = document.createElement('div');
                el.setAttribute('id', 'loader');
                el.classList.add('loader');
                document.body.appendChild(el);
            }
            inited = true;
        }
    },
};

export default Loader;
