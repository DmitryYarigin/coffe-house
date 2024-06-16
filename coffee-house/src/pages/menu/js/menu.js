console.log("hello menu world");

let menuTabItems = document.querySelectorAll(".menu__tab-item");

menuTabItems.forEach((item) => {
    item.addEventListener('click', function (e) {
        console.log(item);
    })
}
)