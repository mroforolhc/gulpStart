const Validator = {
    isNotEmpty(value) {
        return value ? undefined : main.polyglot.t('required');
    },

    isNumber(value) {
        return Number.isNaN(value) ? 'Must be a number' : undefined;
    },

    minValue(min) {
        return (value) => (Number.isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`);
    },

    maxValue(max) {
        return (value) => (Number.isNaN(value) || value <= max ? undefined : `Should be less than ${max}`);
    },

    isEmail(value) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase()) ? undefined : 'Please enter correct email';
    },

    combineValidators(...validators) {
        return (value) => validators.reduce(
            (error, validator) => error || validator(value), undefined,
        );
    },
};

export default Validator;
