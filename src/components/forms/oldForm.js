const AjaxForm = {
    init() {
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM' && e.target.dataset.ajax !== undefined) {
                e.preventDefault();
                const values = new FormData(e.target);
                Loader.show();
                const url = e.target.getAttribute('action');
                const method = e.target.getAttribute('method') ? e.target.getAttribute('method') : 'POST';
                for (const button of e.target.querySelectorAll('button[type="submit"], input[type="submit"]')) {
                    button.setAttribute('disabled', true);
                }
                fetch(url, {
                    method,
                    cache: 'no-store',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: values,
                })
                    .then((response) => {
                        Loader.hide();
                        for (const button of e.target.querySelectorAll('button[type="submit"], input[type="submit"]')) {
                            button.removeAttribute('disabled');
                        }
                        for (const input of e.target.querySelectorAll('.input_failure')) {
                            input.classList.remove('input_failure');
                        }
                        for (const error of e.target.querySelectorAll('.form__error')) {
                            error.setAttribute('hidden', true);
                            error.innerHTML = '';
                        }
                        if (response.redirected) {
                            window.location.replace(response.url);
                            return response;
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data.success === true) {
                            let container = e.target.closest('[data-form-content]');
                            if (!container) {
                                container = e.target;
                            }
                            container.classList.add('modal__success');
                            nojq.html(container, data.message);
                        } else if (data.success === false && data.errors) {
                            for (const name in data.errors) {
                                if (!data.errors.hasOwnProperty(name)) {
                                    continue;
                                }
                                const field = e.target.querySelector(`[name="${name}"]`);
                                if (field) {
                                    field.classList.add('input_failure');
                                }
                                const error = e.target.querySelector(`[data-error="${name}"]`);
                                if (error) {
                                    error.removeAttribute('hidden');
                                    error.innerHTML = data.errors[name].join(' ');
                                }
                            }
                        }
                    })
                    .catch((err) => {});
            }
        });
    },
};

export default AjaxForm;
