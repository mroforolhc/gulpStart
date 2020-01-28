function openToolbarMenu(item) {
    const siblings = item.parentElement.children;
    const submenu = item.querySelector('.menu_submenu');

    for (let i = 0; i < siblings.length; i += 1) {
        if (!(item === siblings[i])) {
            siblings[i].style.display = 'none';
        }
    }

    submenu.style.height = `${submenu.scrollHeight}px`;
    submenu.style.overflow = 'visible';

    if (item.classList.contains('menu__item')) item.classList.add('menu__item_opened');
}

function closeToolbarMenu(item) {
    const siblings = item.parentElement.children;
    const submenu = item.querySelector('.menu_submenu');

    for (let i = 0; i < siblings.length; i += 1) {
        if (!(item === siblings[i])) {
            siblings[i].style.display = 'block';
        }
    }

    submenu.style.height = '0';
    submenu.style.overflow = 'hidden';
    if (item.classList.contains('menu__item')) item.classList.remove('menu__item_opened');


    // close nested menu
    const openNestedItem = submenu.querySelector('.menu_submenu .menu__item_opened');
    if (openNestedItem) closeToolbarMenu(openNestedItem);
}


function toggleToolbarMenu() {
    const toolbar = document.querySelector('#toolbar-menu .menu');
    if (toolbar) {
        toolbar.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (li && li.querySelector('.menu_submenu')) {
                e.stopPropagation();
                e.preventDefault();

                if (li.classList.contains('menu__item_opened')) {
                    closeToolbarMenu(li);
                } else {
                    openToolbarMenu(li);
                }
            }
        });
    }
}

export {
    openToolbarMenu,
    closeToolbarMenu,
    toggleToolbarMenu,
};
