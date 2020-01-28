import * as nojq from './no_jquery';
import Loader from '../../blocks/_global/loader/loader';

let overlay;
let container;
let main;
let modifier;
let loading = false;

const Modal = {
    open(data, mod = '') {
        document.body.classList.add('modal-open');
        overlay.classList.add('modal-show');
        if (mod) {
            modifier = `modal_${mod}`;
            main.classList.add(modifier);
        }
        nojq.html(container, data);
    },
    close() {
        document.body.classList.remove('modal-open');
        overlay.classList.remove('modal-show');
        setTimeout(this.clear, 300);
    },
    load(url, mod = '') {
        Loader.show();
        fetch(url,
            {
                method: 'GET',
                credentials: 'same-origin',
                cache: 'no-cache',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then((response) => response.text())
            .then((data) => {
                Loader.hide();
                Modal.open(data, mod);
                loading = false;
            });
    },
    clear() {
        container.innerHTML = '';
        if (modifier) {
            main.classList.remove(modifier);
            modifier = null;
        }
    },
    init() {
        overlay = document.body.querySelector('.overlay.overlay_modal');
        if (!overlay) {
            return false;
        }

        document.addEventListener('click', (event) => {
            if (event.target.dataset.modal !== undefined) {
                event.preventDefault();
                if (loading) {
                    return false;
                }
                loading = true;
                Modal.load(event.target.getAttribute('href'), event.target.dataset.modalMod);
            }
            return true;
        }, false);

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('overlay_modal') || e.target.dataset.modalClose !== undefined) {
                Modal.close();
            }
        });

        container = overlay.querySelector('.modal__container');
        main = overlay.querySelector('.modal');
        return true;
    },
};

export default Modal;
