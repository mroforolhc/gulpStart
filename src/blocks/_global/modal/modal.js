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
    if (link.dataset.modalInline !== undefined) {
        const content = document.querySelector(link.dataset.modalInline);
        if (content) {
            Modal.open(content.innerHTML, link.dataset.modal);
        }
    } else {
        loading = true;
        Modal.load(link.getAttribute('href'), link.dataset.modal);
    }
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
        app.events.emit('modal.open', { el: overlay });
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
                cache: 'no-store',
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

        document.addEventListener('click', (e) => {
            if (e.target.dataset.modal !== undefined || e.target.closest('[data-modal]')) {
                clickDataModal(e);
            }
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
