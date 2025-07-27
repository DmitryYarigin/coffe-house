console.log('hello-menu-btn');

const menuBtn = document.querySelector('.header__burger-btn');
const navigation = document.querySelector('.header__inner');
const navItems = document.querySelectorAll('.header__list-item');

const toggleMenu = function() {
    document.body.classList.toggle('lock');
    navigation.classList.toggle('open');
    menuBtn.classList.toggle('open');
}

// Обработчик кнопки меню
menuBtn.addEventListener('click', function(e) {
    toggleMenu();
    e.stopPropagation(); // Останавливаем всплытие
    console.log('нажал (обработчик кнопки)');
}, { once: false }); // Явно указываем, что обработчик не одноразовый

// Закрытие при клике на пункты меню
navItems.forEach((navItem) => {
    navItem.addEventListener('click', function(e) {
        e.stopPropagation(); // Останавливаем всплытие
        if(navigation.classList.contains('open')) {
            toggleMenu();
        }
    })
})

// Закрытие при клике вне меню
// document.addEventListener('click', function(e) {
//     const target = e.target;
//     const clickedInsideMenu = navigation.contains(target); 
//     const clickedOnBtn = target === menuBtn || menuBtn.contains(target);
    
//     if(navigation.classList.contains('open') && !clickedInsideMenu && !clickedOnBtn) {
//         console.log("Закрытие: клик вне меню");
//         toggleMenu();
//     }
// })

