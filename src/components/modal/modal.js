import { observable, reaction } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import BaseComponent from '../baseComponent/baseComponent';

const ESC_KEY = 27;

class ModalState {
    @observable isOpen = false;
    isComponent;
    name;
    content;
}

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
                <div className="overlay__modal">
                    <div
                        className={modalState.name ? `modal modal_${modalState.name}` : 'modal'}
                        onClick={this.handleModalOnClick}
                        onKeyDown={this.handleKeyDown}
                        tabIndex="0"
                    >
                        <div className="modal__close" onClick={this.handleCloseOnClick} aria-hidden="true" />
                        {
                            modalState.isComponent
                                ? <div className="modal__container">{ modalState.content }</div>
                                : (
                                    <div
                                        className="modal__container"
                                        /* eslint-disable-next-line react/no-danger */
                                        dangerouslySetInnerHTML={{ __html: modalState.content }}
                                    />
                                )
                        }
                    </div>
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

    async loadContent(url) {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            cache: 'no-store',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });

        if (response.ok) this.state.content = await response.text();
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

        document.addEventListener('click', (e) => {
            const trigger = e.target;
            const url = trigger.getAttribute('href');
            const modalName = trigger.dataset.modal;

            if (modalName) {
                e.preventDefault();

                const formComponent = main.manager.getComponent('forms');
                const form = formComponent.getForm(modalName);

                if (form) {
                    this.state.isComponent = true;
                    this.state.content = form.render();
                    this.open();
                } else {
                    this.state.isComponent = false;
                    this.loadContent(url).then(() => this.open());
                }
            }
        });

        reaction(
            () => this.state.isOpen,
            (isOpen) => {
                if (isOpen) {
                    document.body.classList.add('modal-open');
                    document.querySelector('.modal').focus();
                } else {
                    document.body.classList.remove('modal-open');
                    this.state.content = '';
                }
            },
        );
    }
}

export default Modal;
