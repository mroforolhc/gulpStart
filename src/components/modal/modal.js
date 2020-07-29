import { observable, reaction } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import BaseComponent from '../baseComponent/baseComponent';

class ModalState {
    @observable isOpen = false;
    @observable url = '';
    @observable modifier = '';
    @observable content = '';
}

@observer
class ModalComponent extends React.Component {
    render() {
        const { state } = this.props;
        return (
            <div className="overlay overlay_modal">
                <div className={state.modifier ? `modal modal_${state.modifier}` : 'modal'}>
                    <div className="modal__close"/>
                    <div className="modal__container">
                        {state.content}
                    </div>
                </div>
            </div>
        );
    }
}

class Modal extends BaseComponent {
    constructor(name) {
        super(name);
        this.state = new ModalState();
    }

    loadContent(url) {
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
                this.state.content = data;
            });
    }

    open() {
        this.state.isOpen = true;
    }

    close() {
        this.state.isOpen = false;
    }

    init() {
        ReactDOM.render(
            <ModalComponent state={this.state}/>,
            document.getElementById('modal'),
        );

        const triggers = document.body.querySelectorAll('[data-modal]');
        triggers.forEach((trigger) => {
            const modifier = trigger.dataset.modal;
            const href = trigger.getAttribute('href');

            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                this.state.modifier = modifier;
                this.state.url = href;
            });
        });

        reaction(
            () => this.state.url,
            (url) => this.loadContent(url),
        );
    }
}

export default Modal;
