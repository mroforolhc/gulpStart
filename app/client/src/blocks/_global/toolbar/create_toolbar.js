import Velocity from 'velocity-animate';
import BreakpointChecker from '../../../includes/scripts/breakpoint_checker';

const toolbar = document.querySelector('.mobile-toolbar__list');
function showToolbar() {
    toolbar.dataset.isVisible = 'true';
    Velocity(toolbar, 'stop', true);
    Velocity(toolbar, 'fadeIn', { duration: 300, display: 'flex' });
}
function hideToolbar() {
    delete toolbar.dataset.isVisible;
    Velocity(toolbar, 'stop', true);
    Velocity(toolbar, 'fadeOut', { duration: 300, display: 'none' });
}

function autoHideToolbar() {
    let delta = 0;
    const toggler = {
        show() {
            if (!toolbar.dataset.isVisible) {
                showToolbar();
            }
        },
        hide() {
            if (toolbar.dataset.isVisible) {
                hideToolbar();
            }
        },
        autoShow() {
            let result = false;
            if (window.scrollTop < window.clientHeight) {
                this.show();
                result = true;
            }
            return result;
        },
        init() {
            toolbar.dataset.isVisible = true;
            if (!this.autoShow()) {
                this.hide();
            }

            let scroll = document.body.scrollTop || document.documentElement.scrollTop;
            window.addEventListener('scroll', () => {
                const newScroll = document.body.scrollTop || document.documentElement.scrollTop;
                if (Math.abs(newScroll - scroll) >= 5) {
                    if (window.clientWidth >= BreakpointChecker.getSize('sm')) {
                        return;
                    }

                    if (toggler.autoShow()) {
                        return;
                    }

                    if (newScroll - scroll <= 0) {
                        delta += Math.abs(newScroll - scroll);
                        if (delta > 200) {
                            toggler.show();
                        }
                    } else {
                        delta = 0;
                        toggler.hide();
                    }

                    scroll = newScroll;
                }
            });

            window.addEventListener('resize', () => {
                if (document.body.clientWidth >= BreakpointChecker.getSize('sm')) {
                    toolbar.removeAttribute('style');
                }
            });
        },
    };
    toggler.init();
}

function createToolbar() {
    const blocks = document.body.querySelectorAll('.mobile-toolbar__block');
    const buttons = document.body.querySelectorAll('button.mobile-toolbar__item');
    const container = document.body.querySelector('.mobile-toolbar__container');
    const close = document.body.querySelector('.mobile-toolbar__close');
    let icon;

    let openButton = -1;

    window.addEventListener('resize', () => {
        if ((document.body.clientWidth <= BreakpointChecker.getSize('sm')) && (openButton >= 0)) {
            document.body.classList.add('toolbar-open');
        } else {
            document.body.classList.remove('toolbar-open');
        }
    });

    buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
            if (openButton === i) {
                container.style.height = '0';

                icon = buttons[i].querySelector('.mobile-toolbar__icon');
                icon.classList.remove('mobile-toolbar__icon_active');
                blocks[i].classList.remove('mobile-toolbar__block_show');

                document.body.classList.remove('toolbar-open');

                openButton = -1;
            } else {
                container.style.height = `${window.innerHeight - 48}px`;

                if (openButton !== -1) {
                    icon = buttons[openButton].querySelector('.mobile-toolbar__icon');
                    icon.classList.remove('mobile-toolbar__icon_active');
                    blocks[openButton].classList.remove('mobile-toolbar__block_show');
                }

                icon = buttons[i].querySelector('.mobile-toolbar__icon');
                icon.classList.add('mobile-toolbar__icon_active');
                blocks[i].classList.add('mobile-toolbar__block_show');

                document.body.classList.add('toolbar-open');

                openButton = i;
            }
        });
    });

    close.addEventListener('click', () => {
        container.style.height = '0';
        blocks[openButton].classList.remove('mobile-toolbar__block_show');
        document.body.classList.remove('toolbar-open');
        icon.classList.remove('mobile-toolbar__icon_active');

        openButton = -1;
    });

    autoHideToolbar();
}

export default createToolbar;
