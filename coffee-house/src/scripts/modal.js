import { productData } from "../index";

// modal.js
let currentProduct = null;
const modalTitle = document.querySelector('.modal__title');
const modalDescription = document.querySelector('.modal__description');
const modalImage = document.querySelector('.modal__image');

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

function openModal(product) {
  if(product) {
    currentProduct = product;
    // Заполняем данные продукта
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalImage.src = product.img;
    modalImage.alt = product.name;

    // Устанавливаем базовую цену (цена товара + цена выбранного размера по умолчанию 's')

    basePrice = parseFloat(product.price) + parseFloat(product.sizes.s['add-price']);
    updateTotalPrice();
    
    // Обновляем варианты размеров
    updateSizeOptions(product.sizes);
    
    // Обновляем варианты добавок
    updateAdditiveOptions(product.additives);
  }

  modalElem.style.visibility = 'visible';
  modalElem.style.opacity = 1;
  window.addEventListener('keydown', closeModal);
}

// Обновление вариантов размеров

function updateSizeOptions(sizes) {
  const sizeElems = document.querySelectorAll('.modal__size-elem');

  sizeElems.forEach((elem, index) => {
    const sizeKey = ['s', 'm', 'l'][index];
    const sizeData = sizes[sizeKey];

    if (sizeData) {
      console.log(sizeData);
      const sizeValue = elem.querySelector('.modal__border-sec-el');
      if (sizeValue) {
        console.log(sizeValue);
        sizeValue.textContent = sizeData.size;
        console.log(sizeValue);
      }
    }
  })
}

function updateAdditiveOptions(additives) {
  const additeveElems = document.querySelectorAll('.modal__additives-elem');

  additeveElems.forEach((elem, index) => {
    if(additives[index]) {
      const additivesName = elem.querySelector('.modal__border-sec-el');
      if(additivesName) {
        additivesName.textContent = additives[index].name;
      }
    }
  })
}

// Функции для работы с выбором параметров
function resetActive(elems, className = 'modal__dark-ver') {
  elems.forEach(elem => elem.classList.remove(className));
}

// функция изменяющая размер продукта
function handleSizeSelection(selectedSize) {
  if (!selectedSize || !sizeElems) return;
  
  resetActive(sizeElems);
  selectedSize.classList.add('modal__dark-ver');
  
 // Определяем выбранный размер
  const sizeIndex = Array.from(sizeElems).indexOf(selectedSize);
  const sizeKey = ['s', 'm', 'l'][sizeIndex];

  // Устанавливаем базовую цену = цена товара + цена выбранного размера
  basePrice = parseFloat(currentProduct.price) + parseFloat(currentProduct.sizes[sizeKey]['add-price']);

  updateTotalPrice();
}

function handleAdditiveSelection(additive) {
  if (!additive) return;
  additive.classList.toggle('modal__dark-ver');
   updateTotalPrice();
}

function calculateTotalPrice() {
  if (!currentProduct) return basePrice.toFixed(2);
  
  let total = basePrice;
  
  // Добавляем стоимость выбранных добавок
  document.querySelectorAll('.modal__additives-elem.modal__dark-ver').forEach((elem, index) => {
    if (currentProduct.additives[index]) {
      total += parseFloat(currentProduct.additives[index]['add-price']);
    }
  });
  
  return total.toFixed(2);
}


function updateTotalPrice() {
  if (!modalTotalPrice) return;
  const total = calculateTotalPrice();
  modalTotalPrice.textContent = `$${total}`;
}

function initEventHandlers() {
  if (modalElem) {
  // Обработчики для размеров
  document.querySelectorAll('.modal__size-elem').forEach(elem => {
    elem.addEventListener('click', () => {
      handleSizeSelection(elem);
    });
  });
  
  // Обработчики для добавок
  document.querySelectorAll('.modal__additives-elem').forEach(elem => {
    elem.addEventListener('click', () => {
      if(elem.classList.contains('modal__dark-ver')) {
          elem.classList.add('no-hover');
          // setTimeout(elem.classList.remove('no-hover'), 100);
          console.log('отжимаем кнопку');
      }
      handleAdditiveSelection(elem);
    });
  });
  
  // Обработчик для карточек меню
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.menu__card');
    if (card && modalElem) {
      const productId = card.dataset.id;
      const product = productData.find(item => item.id == productId);
      if (product) openModal(product);
    }
  });
   modalElem.addEventListener('click', closeModal);
   btnClose.addEventListener('click', closeModal);
  }
}
  
  // Обработчик для модального окна
  if (modalElem) {
    modalElem.addEventListener('click', closeModal);
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