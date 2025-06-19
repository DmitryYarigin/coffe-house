
window.onload = () => {
// переменные модального окна
    const menuCards = document.querySelectorAll('.menu__card');
    const modalElem = document.querySelector('.modal');
    const btnClose = document.querySelector('.modal__close');
// переменные кнопок выбора размера и добавок
    const sizeElems = document.querySelectorAll('.modal__size-elem');
    const additevesElems = document.querySelectorAll('.modal__additives-elem');
// переменные для изменения общей стоимости напитка
    const modalTotalPrise = document.querySelector('.modal__total-prise');

    // логика открытия и закрытия модального окна
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

// выбираем параметры заказа в модальном окне

// Функция нажимающая и отжимающая кнопки выбора размера и добавок для напитка
function setupMenuItems(menuItems) {  

    let totalPrise = 0;

menuItems.forEach((menuElem) => {
    menuElem.addEventListener('click', function (e) {
        e.preventDefault();

        let currentItem = e.currentTarget;
        console.log(currentItem);
        // if(currentItem.classList.contains('modal__dark-ver')) {
        //     currentItem.classList.remove('modal__dark-ver');
        //     currentItem.classList.add('no-hover');
        //     currentItem.addEventListener("mouseout", (event) => {
        //         event.target.classList.remove('no-hover')
        //     })
        //     // console.log('click');
        //     // console.log(currentItem);


        // }
        // else {
            if (currentItem.classList.contains('second-el')){
              totalPrise = 8;  
              modalTotalPrise.innerHTML = `$${totalPrise}.00`;   
            } else if(currentItem.classList.contains('third-el')) {
              totalPrise = 9;    
              modalTotalPrise.innerHTML = `$${totalPrise}.00`;
            } else if(currentItem.classList.contains('first-el')) {
              totalPrise = 7;    
              modalTotalPrise.innerHTML = `$${totalPrise}.00`;   
            }

            if (currentItem.classList.contains('first-add')){
               totalPrise += 1;  
               modalTotalPrise.innerHTML = `$${totalPrise}.00`;
            }

            menuItems.forEach((item) => {
                item.classList.remove('modal__dark-ver');
                currentItem.classList.add('modal__dark-ver');
            })

        // }

        

    })
})
}

setupMenuItems(sizeElems);
setupMenuItems(additevesElems);

// дальше описываем добавление общей стоимости в total


}