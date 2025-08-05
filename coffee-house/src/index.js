// index.js
import './pages/home/index.html';
import './pages/menu/menu.html';
import './pages/home/style.scss';
import './pages/menu/menu.scss';
import './scripts/products.json';
import products from './scripts/products.json';
import '../src/pages/menu/js/menu';
import'./scripts/burger-menu';
import'./scripts/slider';
import './scripts/modal';

import { renderCardsByCategory } from './pages/menu/js/menu';

import { updateMenuCards } from './scripts/modal';

export const cards = document.querySelector('.menu__cards-block');
console.log(cards);
const btnShowCards = document.querySelector('.show-cards');
export let productData = [];

async function getProducts2() {
    try {
        const response = await fetch('./assets/products.json');
        console.log('пошел запрос');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        productData = await response.json();
        renderStartPage(productData); // а тут подключается функция отображения карточек
    }
     catch (error) {
        console.log('Error fetching products:', error);
    }
}

getProducts2();

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return
    }

    renderCardsByCategory('coffee');
    console.log('должны выйти кофейные карточки');
}

// А ВОТ УЖЕ РЕНДЕР КАРТОЧКИ

export function createCards(data) {
    cards.innerHTML = ''; // Очищаем предыдущие карточки перед добавлением новых
    data.forEach(card => {
        const { name, description, category, price, img, size, id } = card;       
        const cardItem = 
        `
            <div class="menu__card" data-id="${id}">
        
                    <div class="menu__img-block">
                        <img class="menu__image" src="${img}">
                    </div>
                    <div class="menu__card-content">
                        <h3 class="menu__card-header">${name}</h3>
                        <p class="menu__pharagraf">${description}</p>
                        <div class="menu__prise">$${price}</div>
                    </div>
            </div>
        `
             cards.insertAdjacentHTML('beforeend',cardItem)
    });


    // Плавное появление новых карточек
    setTimeout(() => {
        let newCards = document.querySelectorAll('.menu__card');
        newCards.forEach(card => {
            card.classList.add('show');
        });
    }, 50);
    
};





