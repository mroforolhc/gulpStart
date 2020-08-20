import React from 'react';
import { Field } from 'react-final-form';

import Validator from './validator';
import Beautifier from './beautifier';

const CallbackForm = (props) => {
    const { handleSubmit, submitting } = props;

    return (
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
                        { meta.error && meta.touched && <span className="form__text">{ meta.error }</span> }
                    </div>
                )}
            </Field>
            <Field name="phone" validate={Validator.isNotEmpty} parse={Beautifier.toPhone}>
                {({ input, meta }) => (
                    <div className="form__group">
                        <label className="form__label" htmlFor="callbackPhoneInput">Phone</label>
                        <input
                            {...input}
                            className="form__control"
                            type="text"
                            placeholder="+7 (999) 99-99"
                            id="callbackPhoneInput"
                        />
                        { meta.error && meta.touched && <span className="form__text">{ meta.error }</span> }
                    </div>
                )}
            </Field>
            <button
                className="button"
                type="submit"
                disabled={submitting}
            >
                Submit
            </button>
        </form>
    );
};

export default CallbackForm;
