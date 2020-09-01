import CustomForm from './form';
import BaseComponent from '../baseComponent/baseComponent';
import AskForm from './components/ask-form';
import CallbackForm from './components/callback-form';

class FormsState {
    forms = [];
}

const formsState = new FormsState();

class Forms extends BaseComponent {
    constructor(name) {
        super(name);
        this.state = formsState;
    }

    init() {
        this.state.forms.push(new CustomForm('ask', AskForm));
        this.state.forms.push(new CustomForm('callback', CallbackForm));
    }

    getForm(name) {
        return this.state.forms.find((form) => form.getName() === name);
    }
}

export default Forms;
