const toolbar = document.querySelector('.mobile-toolbar__list');

function showToolbar() {
    toolbar.dataset.isVisible = 'true';
    app.import('velocity').then(({ default: Velocity }) => {
        Velocity(toolbar, 'stop', true);
        Velocity(toolbar, 'fadeIn', { duration: 300, display: 'flex' });
    });
}

function hideToolbar() {
    delete toolbar.dataset.isVisible;
    app.import('velocity').then(({ default: Velocity }) => {
        Velocity(toolbar, 'stop', true);
        Velocity(toolbar, 'fadeOut', { duration: 300, display: 'none' });
    });
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
            window.addEventListener('resize', () => {
                if (document.body.clientWidth >= BreakpointChecker.getSize('md')) {
                    toolbar.removeAttribute('style');
                }
            });
            window.addEventListener('scroll', () => {
                const newScroll = document.body.scrollTop || document.documentElement.scrollTop;
                if (Math.abs(newScroll - scroll) >= 5) {
                    if (window.clientWidth >= BreakpointChecker.getSize('md')) {
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
                if (document.body.clientWidth >= BreakpointChecker.getSize('md')) {
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
    let icon;

    let openButton = -1;

    window.addEventListener('resize', () => {
        if ((document.body.clientWidth <= BreakpointChecker.getSize('md')) && (openButton >= 0)) {
            document.body.classList.add('toolbar-open');
        } else {
            document.body.classList.remove('toolbar-open');
        }
    });

    buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
            if (openButton === i) {
                container.style.height = '0';

                buttons[i].classList.remove('mobile-toolbar__item_active');
                blocks[i].classList.remove('mobile-toolbar__block_show');

                document.body.classList.remove('toolbar-open');

                openButton = -1;
            } else {
                container.style.height = `${window.innerHeight - 48}px`;

                if (openButton !== -1) {
                    buttons[openButton].classList.remove('mobile-toolbar__item_active');
                    blocks[openButton].classList.remove('mobile-toolbar__block_show');
                }

                buttons[i].classList.add('mobile-toolbar__item_active');
                blocks[i].classList.add('mobile-toolbar__block_show');

                document.body.classList.add('toolbar-open');

                openButton = i;
            }
        });
    });

    autoHideToolbar();
}

export default createToolbar;
