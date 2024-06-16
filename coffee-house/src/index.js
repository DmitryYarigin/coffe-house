import './pages/home/index.html';
import './pages/menu/menu.html';
import './pages/home/style.scss';
import './pages/menu/menu.scss';
import './scripts/products.json';
import products from './scripts/products.json';
import './pages/menu/js/menu';


const cards = document.querySelector('.menu__cards-block');
console.log(cards);
const btnShowCards = document.querySelector('.show-cards');
let productData = [];

async function getProducts2() {
    try {
        const response = await fetch('./assets/products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        productData = await response.json();
        console.log(productData);
        renderStartPage(productData); // а тут подключается функция отображения карточек
    }

     catch (error) {
        console.log('Error fetching products:', error);
    }
    console.log(productData);
}

getProducts2();

function renderStartPage(data) {
    console.log(data);
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return
    }

    createCards(data);
}

// А ВОТ УЖЕ РЕНДЕР КАРТОЧКИ

function createCards(data) {
    data.forEach(card => {
        const { name, description, category, price, img, size } = card;       
        const cardItem = 
        `
            <div class="menu__card">
        
                    <div class="menu___img-block">
                        <img class="menu__image" src="${img}">
                    </div>
                    <div class="menu__card-content">
                        <h3 class="menu__card-header">${name}</h3>
                        <p class="menu__pharagraf">${description}</p>
                        <div class="menu__prise">${price}</div>
                    </div>
            </div>
        `
        cards.insertAdjacentHTML('beforeend',cardItem)
        if( category == 'coffee') {
        }
    });
}





