const menuCards = document.querySelectorAll('.menu__card');
const menuCard = document.querySelector('.menu__card');

menuCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('нажали на карточку');
    })
})

// menuCard.addEventListener('click', () => {
//     console.log('нажали');
// })

console.log(menuCard);