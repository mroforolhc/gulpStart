import React from 'react';
import { Form } from 'react-final-form';
import createDecorator from 'final-form-submit-listener';

class CustomForm {
    constructor(name, form) {
        this.name = name;

        this.url = form.url;
        this.component = form.component;
        this.data = undefined;

        this.listeners = {};
        this.submit = this.submit.bind(this);

        if (typeof (form.beforeSubmit) === 'function') {
            this.listeners.beforeSubmit = form.beforeSubmit;
        }

        if (typeof (form.afterSubmitSucceeded) === 'function') {
            this.listeners.afterSubmitSucceeded = form.afterSubmitSucceeded;
        }

        if (typeof (form.afterSubmitFailed) === 'function') {
            this.listeners.afterSubmitFailed = form.afterSubmitFailed;
        }

        this.submitListener = createDecorator(this.listeners);
    }

    getName() {
        return this.name;
    }

    render() {
        const Component = this.component;

        return (
            <Form component={Component} decorators={[this.submitListener]} onSubmit={this.submit} />
        );
    }

    async submit(values, form, cb) {
        const response = await fetch(this.url, {
            method: 'POST',
            cache: 'no-store',
            credentials: 'same-origin',
            redirect: 'follow',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            return Promise.resolve({ error: response.statusText });
        }

        this.data = await response.text();

        return response;
    }
}

export default CustomForm;
