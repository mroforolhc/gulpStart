import * as nojq from './no_jquery';
import Loader from '../../blocks/_global/loader/loader';

const AjaxForm = {
    init() {
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM' && e.target.dataset.ajax !== undefined) {
                e.preventDefault();
                const values = new FormData(e.target);
                Loader.show();
                const url = e.target.getAttribute('action');
                const method = e.target.getAttribute('method') ? e.target.getAttribute('method') : 'POST';
                e.target
                    .querySelector('button[type="submit"], input[type="submit"]')
                    .setAttribute('disabled', true);
                fetch(url, {
                    method,
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: values,
                })
                    .then((response) => response.text())
                    .then((data) => {
                        Loader.hide();
                        const form = nojq.is(data, ':scope > form[data-ajax]');
                        if (form) {
                            e.target.replaceWith(form);
                        } else {
                            nojq.html(e.target.closest('[data-id="replace-on-submit"]'), data);
                        }
                    });
            }
        });
    },
};

export default AjaxForm;
