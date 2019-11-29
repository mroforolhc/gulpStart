export default () => {
    const button = document.body.querySelector('.header__arrow');
    const popup = document.body.querySelector('.popup-contacts');
    if (popup) {
        button.addEventListener('click', () => {
            button.classList.toggle('reverse');
            popup.classList.toggle('popup-contacts_show');
        });

        window.addEventListener('click', (e) => {
            const itsPopup = popup.contains(e.target);
            const itsArrow = button.contains(e.target);

            if (!itsPopup && !itsArrow) popup.classList.remove('popup-contacts_show');
        });
    }
};
