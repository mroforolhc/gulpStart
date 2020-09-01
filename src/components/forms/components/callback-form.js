import React from 'react';
import { Field } from 'react-final-form';

import Validator from '../utilities/validator';
import Beautifier from '../utilities/beautifier';

const CallbackFormComponent = (props) => {
    const {
        handleSubmit,
        submitting,
        submitSucceeded,
        submitFailed,
    } = props;

    if (submitSucceeded) {
        return <div>Success</div>;
    }

    return (
        <>
            <div className="modal__title">Вам позвонить?</div>
            <form onSubmit={handleSubmit}>
                <Field name="name" validate={Validator.isNotEmpty}>
                    {({ input, meta }) => (
                        <div className="form__group">
                            <label className="form__label" htmlFor="callbackNameInput">Имя</label>
                            <input
                                {...input}
                                className="form__control"
                                type="text"
                                placeholder="Введите имя"
                                id="callbackNameInput"
                            />
                            {meta.error && meta.touched && <span className="form__text">{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <Field name="phone" validate={Validator.isNotEmpty} parse={Beautifier.toPhone}>
                    {({ input, meta }) => (
                        <div className="form__group">
                            <label className="form__label" htmlFor="callbackPhoneInput">Телефон</label>
                            <input
                                {...input}
                                className="form__control"
                                type="text"
                                placeholder="+7 (999) 99-99"
                                id="callbackPhoneInput"
                            />
                            {meta.error && meta.touched && <span className="form__text">{meta.error}</span>}
                        </div>
                    )}
                </Field>
                <button
                    className="button"
                    type="submit"
                    disabled={submitting}
                >
                    {main.polyglot.t('send')}
                </button>

                {submitFailed && <div>Submit Fail!</div>}
            </form>
        </>
    );
};

const CallbackForm = {
    url: '',

    beforeSubmit: (form) => {
        console.log(form);
    },

    afterSubmitSucceeded: (form) => {
        console.log(form);
    },

    afterSubmitFailed: (form) => {
        console.log(form.getState());
    },

    component: CallbackFormComponent,
};

export default CallbackForm;
