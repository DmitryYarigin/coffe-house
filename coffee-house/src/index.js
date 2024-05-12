import './pages/home/index.html';
import './pages/menu/menu.html';
import './pages/home/style.scss';
import './pages/menu/menu.scss';
import products from './scripts/products.json';
import primer from './scripts/easdf.json';

console.log(products);

const cards = document.querySelector('.menu__cards-block');
console.log(cards);
const btnShowCards = document.querySelector('.show-cards');
const COUNT_SHOW_CARDS_CLICK = 4;
let countClickBtnShowCards = 1;
let productData = [];



async function getProducts2() {
    try {
        const response = await fetch('../scripts/products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        productData = await response.json();
        console.log(productData);
    } catch (error) {
        console.log('Error fetching products:', error);
    }
    console.log(productData);
}

// getProducts();

getProducts2();

// функция получает данные из json файла
async function getProducts() {
    try {
        // if (!productData.length) {
            console.log(products);
            const res = await fetch(products);
            console.log(res);
            if (!res.ok) {
                throw new Error(res.starusText)
            }
            productData = await res.json();
        // }
        console.log(productData);

        if ((productData.length > COUNT_SHOW_CARDS_CLICK) &&
        btnShowCards.classList.contains('none')) {
            btnShowCards.classList.remove('none');
        }
        renderStartPage(productData); // а тут подключается функция отображения карточек
    }

    catch (err) {
        // showErrorMessage(ERROR_SERVER);
        console.log(err);
    }
}

// ФУНКЦИЯ ГОТОВИТ К РЕНДЕРУ КАРТОЧКИ

function renderStartPage(data) {
    console.log(data);
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return
    }

    createCards(arrCards);
}

// А ВОТ УЖЕ РЕНДЕР КАРТОЧКИ

function createCards(data) {
    data.forEach(card => {
        const { name, description, category, price, img, size } = card;       
        const cardItem = 
        `
        <div class="menu__cards-block">
                <div class="menu__card">
                    <div class="menu___img-block">
                        <img src="../../assets/${img}">
                    </div>
                    <div class="menu__card-content">
                        <h3 class="menu__card-header">${name}</h3>
                        <p class="menu__pharagraf">${description}</p>
                        <div class="menu__prise">${price}</div>
                    </div>
                </div>
            </div>
        `
        cards.insertAdjacentHTML('beforeend',cardItem)
        if( category == 'coffee') {
            console.log('eee');
        }
        console.log('уууу');
    });
}





