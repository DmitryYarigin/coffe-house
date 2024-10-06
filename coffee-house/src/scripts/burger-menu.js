console.log('hello-menu-btn');

const menuBtn = document.querySelector('.header__burger-btn');
const navigation = document.querySelector('.header__inner');
const navItems = document.querySelectorAll('.header__list-item');


// функция открывающая закрывающая меню, меняющая кнопку бургер и не фиксирует скролл

const toggleMenu = function() {
    document.body.classList.toggle('lock');
    navigation.classList.toggle('open');
    // menuBtn.classList.toggle('open');
}

// нажатие на бургер меню и останавливающая всплытие

menuBtn.addEventListener('click', (e) => {
    console.log('нажал');
    e.stopPropagation();
    toggleMenu();
})

// нажимая на элементы меню она закрывается

navItems.forEach((navItem) => {
    navItem.addEventListener('click', () => {
        navigation.classList.remove('open');
        document.body.classList.remove('lock');
    })
})

// нажатие вне меню и закрытие его
document.addEventListener('click', function (e) {

    const target = e.target; // обозначает элемент на который мы нажали
    const itsMenu = target == navigation ; // нажато на меню
    const istBtnMenu = target == menuBtn; //нажатие на кнопку меню
    const menuIsActive = navigation.classList.contains('open'); // меню активно (показано)
    
    if(!istBtnMenu && !istBtnMenu && menuIsActive) {
        console.log(itsMenu);
        toggleMenu(); // закрыть меню
        console.log("нажали вне меню");
    }
})

