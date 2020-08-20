import React from 'react';
import { Field } from 'react-final-form';

import Validator from './validator';

const AskForm = (props) => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="name" validate={Validator.isNotEmpty}>
                {({ input, meta }) => (
                    <div className="form__group">
                        <label className="form__label" htmlFor="askNameInput">Имя</label>
                        <input
                            {...input}
                            className="form__control"
                            type="text"
                            placeholder="Введите имя"
                            id="askNameInput"
                        />
                        { meta.error && meta.touched && <span className="form__text">{ meta.error }</span> }
                    </div>
                )}
            </Field>
            <Field name="email" validate={Validator.isEmail}>
                {({ input, meta }) => (
                    <div className="form__group">
                        <label className="form__label" htmlFor="askEmailInput">Email</label>
                        <input
                            {...input}
                            className="form__control"
                            type="text"
                            placeholder="Введите email"
                            id="askEmailInput"
                        />
                        { meta.error && meta.touched && <span className="form__text">{ meta.error }</span> }
                    </div>
                )}
            </Field>
            <Field name="question" validate={Validator.isNotEmpty}>
                {({ input, meta }) => (
                    <div className="form__group">
                        <label className="form__label" htmlFor="askQuestionTextarea">Вопрос</label>
                        <textarea
                            {...input}
                            className="form__control"
                            placeholder="Введите вопрос"
                            id="askQuestionTextarea"
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

export default AskForm;
