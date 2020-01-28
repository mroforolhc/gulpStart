function setPosition(popoverItem, target) {
    const boxTarget = target.getBoundingClientRect();
    const top = boxTarget.y + target.clientHeight;
    let left = boxTarget.x;
    if (left + popoverItem.clientWidth > window.outerWidth) {
        left -= left + popoverItem.clientWidth - window.outerWidth + 30;
    } else if (left < 0) {
        left = 0;
    }
    popoverItem.style.top = `${top}px`;
    popoverItem.style.left = `${left}px`;

    const arrow = popoverItem.querySelector('[data-popover-arrow]');
    if (arrow) {
        const blockLeft = boxTarget.x - left > 0 ? boxTarget.x - left : 0;
        arrow.style.left = `${blockLeft + (target.clientWidth / 2 - arrow.getBoundingClientRect().width / 2)}px`;
    }
}

function showPopover(popover, target) {
    popover.classList.add('active');
    setPosition(popover, target);
}

function hidePopover(popover) {
    popover.classList.remove('active');
    popover.style.left = null;
    popover.style.top = null;
}

function getPopoverFromEvent(e) {
    const item = e.target.dataset.popover ? e.target : e.target.closest('[data-popover]');
    const id = item.dataset.popover;
    return {
        popover: document.querySelector(`[data-popover-id="${id}"]`),
        target: item,
    };
}

function showEvent(e) {
    const item = getPopoverFromEvent(e);
    showPopover(item.popover, item.target);
    document.addEventListener('touchmove', hideOnTouch);
}

function hideEvent(e) {
    document.removeEventListener('touchmove', hideOnTouch);
    const item = getPopoverFromEvent(e);
    hidePopover(item.popover);
}

function hideOnTouch(e) {
    if (!e.target.dataset.popover && !e.target.closest('[data-popover]') && document.querySelector('[data-popover-id].active')) {
        hidePopover(document.querySelector('[data-popover-id].active'));
    }
}

function popover() {
    for (const item of document.querySelectorAll('[data-popover]')) {
        item.addEventListener('mouseenter', showEvent);
        item.addEventListener('mouseleave', hideEvent);
        item.addEventListener('click', showEvent);
    }
}

export default popover;
