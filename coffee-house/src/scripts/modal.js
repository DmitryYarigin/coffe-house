window.onload = () => {

    const menuCards = document.querySelectorAll('.menu__card');
    const modalElem = document.querySelector('.modal');
    const btnClose = document.querySelector('.modal__close');
    
    console.log(modalElem);

    if(modalElem) {

    // modalElem.style.cssText = `
    // display: flex;
    // visibility: hidden;
    // opacity: 0;
    // transition: opacity 1000ms ease-in-out;
    // `;

    const closeModal = event => {
        const target = event.target;

        if(target === modalElem ||
            (btnClose && target.closest('.modal__close')) ||
            event.code === 'Escape'
        ) {
            console.log(btnClose);
            modalElem.style.opacity = 0;

            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
            }, 1000);

            window.removeEventListener('keydown', closeModal);
        }
    }

    const openModal = () => {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = 1;
        window.addEventListener('keydown', closeModal);
    }



    menuCards.forEach(card => {
        card.addEventListener('click', openModal);
    })  

    modalElem.addEventListener('click', closeModal)
}

}