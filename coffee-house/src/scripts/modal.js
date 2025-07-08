// modal.js
let menuCards, modalElem, btnClose, sizeElems, additivesElems, modalTotalPrice;
let basePrice;

// Конфигурация цен
const prices = {
  sizes: {
    default: 7,
    medium: 8,
    large: 9
  },
  additives: {
    first: 1,
    second: 2,
    third: 3
  }
};

// Функции для работы с модальным окном
function closeModal(event) {
  const target = event.target;

  if(target === modalElem ||
    (btnClose && target.closest('.modal__close')) ||
    event.code === 'Escape'
  ) {
    modalElem.style.opacity = 0;

    setTimeout(() => {
      modalElem.style.visibility = 'hidden';
    }, 1000);

    window.removeEventListener('keydown', closeModal);
  }
}

function openModal() {
  modalElem.style.visibility = 'visible';
  modalElem.style.opacity = 1;
  window.addEventListener('keydown', closeModal);
}

// Функции для работы с выбором параметров
function resetActive(elems, className = 'modal__dark-ver') {
  elems.forEach(elem => elem.classList.remove(className));
}

function handleSizeSelection(selectedSize) {
  if (!selectedSize || !sizeElems) return;
  
  resetActive(sizeElems);
  selectedSize.classList.add('modal__dark-ver');
  
  if (selectedSize.classList.contains('second-el')) {
    basePrice = prices.sizes.medium;
  } else if (selectedSize.classList.contains('third-el')) {
    basePrice = prices.sizes.large;
  } else {
    basePrice = prices.sizes.default;
  }
}

function handleAdditiveSelection(additive) {
  if (!additive) return;
  additive.classList.toggle('modal__dark-ver');
}

function calculateTotalPrice() {
  if (!additivesElems) return basePrice;
  
  let total = basePrice;
  
  additivesElems.forEach(additive => {
    if (additive.classList.contains('modal__dark-ver')) {
      if (additive.classList.contains('first-add')) {
        total += prices.additives.first;
      } else if (additive.classList.contains('second-add')) {
        total += prices.additives.second;
      } else if (additive.classList.contains('third-add')) {
        total += prices.additives.third;
      }
    }
  });
  
  return total;
}

function updateTotalPrice() {
  if (!modalTotalPrice) return;
  const total = calculateTotalPrice();
  modalTotalPrice.textContent = `$${total}.00`;
}

function initEventHandlers() {
  // Обработчики для размеров
  if (sizeElems) {
    sizeElems.forEach(size => {
      size.addEventListener('click', () => {
        handleSizeSelection(size);
        updateTotalPrice();
      });
    });
  }
  
  // Обработчики для добавок
  if (additivesElems) {
    additivesElems.forEach(additive => {
      additive.addEventListener('click', () => {
        handleAdditiveSelection(additive);
        updateTotalPrice();
      });
    });
  }
  
  // Пока это убираем 

  // // Обработчики для карточек меню
  // if (menuCards) {
  //   menuCards.forEach(card => {
  //     card.addEventListener('click', openModal);
  //   });
  // }

  // вместо этого добавим
  
  document.addEventListener('click', (e) => {
    // Проверяем, был ли клик по карточке или её дочерним элементам
    const card = e.target.closest('.menu__card');
    if (card) {
      openModal();
    }
  });
  
  // Обработчик для модального окна
  if (modalElem) {
    modalElem.addEventListener('click', closeModal);
  }
}

export function updateMenuCards() {
  menuCards = document.querySelectorAll('.menu__card');
}

// Основная функция инициализации
window.onload = () => {
  // Инициализация переменных
  menuCards = document.querySelectorAll('.menu__card');
  modalElem = document.querySelector('.modal');
  btnClose = document.querySelector('.modal__close');
  sizeElems = document.querySelectorAll('.modal__size-elem');
  additivesElems = document.querySelectorAll('.modal__additives-elem');
  modalTotalPrice = document.querySelector('.modal__total-prise');
  
  // Установка базовой цены
  basePrice = prices.sizes.default;
  
  // Настройка модального окна
  if (modalElem) {
    modalElem.style.cssText = `
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: opacity 1000ms ease-in-out;
    `;
  }
  
  // Инициализация обработчиков событий
  initEventHandlers();
  
  // Первоначальное обновление цены
  updateTotalPrice();
};