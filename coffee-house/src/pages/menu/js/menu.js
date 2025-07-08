// menu.js
import { productData } from "../../../index";
import { createCards } from "../../../index";
import { cards } from "../../../index";
import '../../../scripts/modal';



let loadMoreBtn = document.querySelector(".menu__load-more")
let itemsPerPage = 4;
let currentPage = 1;
let menuTabItems = document.querySelectorAll(".menu__tab-item");

menuTabItems.forEach((item) => {
    item.addEventListener('click', function (e) {

        e.preventDefault;

        let currentItem = e.currentTarget;

        if (currentItem.classList.contains('dark-ver')) {
            return;
        }

        menuTabItems.forEach((item) => {
            item.classList.remove('dark-ver');
        });

        currentItem.classList.add('dark-ver');
        

        let category = currentItem.getAttribute('data-category');

        console.log(category);

        // cards.innerHTML = '';

        renderCardsByCategory(category);
    }) 
}
)

export function renderCardsByCategory(category) {
    if(!productData || !productData.length) {
        showErrorMessage('NO_PRODUCTS_IN_THIS_CATEGORY');
        return
    }

    const filteredData = productData.filter(product => product.category == category);
    renderCards(filteredData);
}

function renderCards(data) {
    cards.innerHTML = '';

    const startIndex = 0;
    const endIndex = itemsPerPage * currentPage;
    const visibleItems = data.slice(startIndex, endIndex);

    createCards(visibleItems);
// Обновляем обработчик кнопки "Загрузить еще"
    if (data.length > endIndex) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => {
            currentPage++;
            renderCards(data);
        };
    } else {
        loadMoreBtn.style.display = 'none';
    }
        // После создания карточек обновляем ссылки на них
    if (typeof updateMenuCards === 'function') {
        updateMenuCards();
    }
}


