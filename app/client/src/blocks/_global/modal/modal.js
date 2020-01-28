import * as nojq from '../../../includes/scripts/no_jquery';
import Loader from '../loader/loader';

let overlay;
let container;
let main;
let modifier;
let loading = false;

function clickDataModal(event) {
    event.preventDefault();
    let link = event.target;
    if (!event.target.dataset.modal) {
        link = event.target.closest('[data-modal]');
    }
    if (loading) {
        return false;
    }
    loading = true;
    Modal.load(link.getAttribute('href'), link.dataset.modalMod);
}

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
        setTimeout(this.clear, 100);
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

        for (const item of document.querySelectorAll('[data-modal]')) {
            item.addEventListener('click', clickDataModal);
        }

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
