import React from 'react';
import { Form } from 'react-final-form';
import BaseComponent from '../baseComponent/baseComponent';
import AskForm from './ask-form';
import CallbackForm from './callback-form';

class FormState {
    forms = [];
}

const formState = new FormState();

class Forms extends BaseComponent {
    constructor(name) {
        super(name);
        this.state = formState;
    }

    init() {
        this.state.forms.push({ name: 'ask', data: { title: 'Задать вопрос', component: AskForm, url: '/ask' } });
        this.state.forms.push({ name: 'callback', data: { title: 'Вам позвонить?', component: CallbackForm, url: '/callback' } });
    }

    getForm(name) {
        const result = this.state.forms.find((form) => form.name === name);
        if (!result) return undefined;

        return result.data;
    }

    render(name) {
        const form = this.getForm(name);
        const Component = form.component;
        const onSubmit = async (...props) => Forms.submit(form.url, props);

        return (
            <>
                {
                    form.title
                    && <div className="modal__title">{ form.title }</div>
                }

                <Form component={Component} onSubmit={onSubmit} />
            </>
        );
    }

    static async submit(url, props) {
        const value = props[0];
        const callback = props[2];

        const response = await fetch(url);
        console.log(response);
        console.log(callback());
    }
}

export default Forms;
