console.log("hello menu world");

let menuTabItems = document.querySelectorAll(".menu__tab-item");

let menuTabItem = document.querySelector('.menu__icon-text');

menuTabItems.forEach((item) => {
    item.addEventListener('click', function (e) {
        if (item.children[1].innerText === 'Coffee') {
            console.log('это кофе');
        } else if 
            (item.children[1].innerText === 'Tea') {
               console.log('это чай');
            }
         else if (item.children[1].innerText === 'Dessert') {
                console.log('это десерт');
             }
        // console.log(item.children[1].innerText);
    })
}
)