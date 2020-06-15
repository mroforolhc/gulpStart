import { createPopper } from '@popperjs/core';

function createPopover(button, popover, arrow, isReverse = false) {
    const popoverOptions = {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrow,
                    padding: 6,
                },
            },
            {
                name: 'offset',
                options: {
                    offset: [-25, 15],
                },
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['bottom'],
                },
            },
        ],
    };

    document.addEventListener('click', (e) => {
        const { target } = e;

        if (button.contains(target)) {
            popover.classList.toggle('popover_show');
            if (isReverse) {
                button.classList.toggle('reverse');
            }
            app.events.emit('popover_toggle', {popover});
        } else if (!popover.contains(target) && popover.classList.contains('popover_show')) {
            popover.classList.remove('popover_show');
            if (isReverse) {
                button.classList.remove('reverse');
            }
            app.events.emit('popover_toggle', {popover});
        }
    });

    createPopper(button, popover, popoverOptions);
}

export default createPopover;
