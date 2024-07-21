import { productData } from "../../../index";
import { createCards } from "../../../index";
import { cards } from "../../../index";


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
    console.log(filteredData);
    createCards(filteredData);
    console.log('прием');
}