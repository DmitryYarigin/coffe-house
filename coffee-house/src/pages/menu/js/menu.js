import { productData } from "../../../index";
import { createCards } from "../../../index";


let menuTabItems = document.querySelectorAll(".menu__tab-item");

menuTabItems.forEach(( item) => {
    item.addEventListener('click', function (e) {

        let currentItem = e.currentTarget;

        menuTabItems.forEach((item) => {
            item.classList.remove('dark-ver');
        });

        currentItem.classList.add('dark-ver');

        let category = currentItem.getAttribute('data-category');

        console.log(category);

        renderCardsByCategory(category);

        // if (item.children[1].innerText === 'Coffee') {
        //     console.log('это кофе');
        // } else if 
        //     (item.children[1].innerText === 'Tea') {
        //        console.log('это чай');
        //     }
        //  else if (item.children[1].innerText === 'Dessert') {
        //         console.log('это десерт');
        //      }
        // console.log(item.children[1].innerText);
    })
}
)

function renderCardsByCategory(category) {
    if(!productData || !productData.length) {
        showErrorMessage('NO_PRODUCTS_IN_THIS_CATEGORY');
        return
    }

    const filteredData = productData.filter(product => product.category == category);
    console.log(filteredData);
    createCards(filteredData);
}