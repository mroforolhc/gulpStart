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

const ESC_KEY = 27;
const modalState = new ModalState();

@observer
class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.shouldClose = null;
    }

    handleOverlayOnClick = () => {
        if (this.shouldClose === null) this.shouldClose = true;

        if (this.shouldClose) modalState.isOpen = false;
        this.shouldClose = null;
    };

    handleModalOnClick = () => {
        this.shouldClose = false;
    };

    handleCloseOnClick = () => {
        modalState.isOpen = false;
    };

    handleKeyDown = (e) => {
        if (e.keyCode === ESC_KEY) {
            e.stopPropagation();
            modalState.isOpen = false;
        }
    };

    render() {
        let overlayClassNames = 'overlay overlay_modal';
        overlayClassNames += modalState.isOpen ? ' overlay_show' : '';

        return (
            <div
                className={overlayClassNames}
                onClick={this.handleOverlayOnClick}
            >
                <div
                    className={modalState.modifier ? `modal modal_${modalState.modifier}` : 'modal'}
                    onClick={this.handleModalOnClick}
                    onKeyDown={this.handleKeyDown}
                    tabIndex="0"
                >
                    <div className="modal__close" onClick={this.handleCloseOnClick} aria-hidden="true" />
                    <div
                        className="modal__container"
                        /* eslint-disable-next-line react/no-danger */
                        dangerouslySetInnerHTML={{ __html: modalState.content }}
                    />
                </div>
            </div>
        );
    }
}

class Modal extends BaseComponent {
    constructor(name) {
        super(name);
        this.state = modalState;
    }

    loadContent(url) {
        return fetch(url,
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
            <ModalComponent />,
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
            (url) => {
                if (url) this.loadContent(url).then(() => this.open());
            },
        );

        reaction(
            () => this.state.isOpen,
            (isOpen) => {
                if (isOpen) {
                    document.body.classList.add('modal-open');
                    document.querySelector('.modal').focus();
                } else {
                    document.body.classList.remove('modal-open');
                    this.state.url = '';
                }
            },
        );
    }
}

export default Modal;
