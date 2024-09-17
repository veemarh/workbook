let menuFixed = false;
let menuToggle = document.getElementById('nav-toggle');
let toggleHamburger = document.getElementById('toggle-hamburger');
let toggleArrow = document.getElementById('toggle-arrow');
let toggleCross = document.getElementById('toggle-cross');
let menu = document.getElementById('nav-menu');
let userIcon = document.getElementById('user-icon');
let userApp = document.getElementById('user-popup-menu');

document.addEventListener('DOMContentLoaded', function () {
    /* события для навигационного меню в мобильном режиме */
    menuToggle.addEventListener('mouseover', function () {
        menu.classList.add('active');
        if (!menuFixed) {
            ToggleActive(toggleHamburger, toggleArrow);
        }
    });
    menu.addEventListener('mouseleave', function () {
        if (!menuFixed) {
            menu.classList.remove('active');
            ToggleActive(toggleArrow, toggleHamburger);
        }
    });
    menuToggle.addEventListener('click', function () {
        if (menuFixed) {
            menu.classList.remove('active');
            ToggleActive(toggleCross, toggleHamburger);
        } else {
            menu.classList.add('active');
            if (toggleArrow.classList.contains('active')) {
                ToggleActive(toggleArrow, toggleCross);
            } else {
                ToggleActive(toggleHamburger, toggleCross);
            }
        }
        menuFixed = !menuFixed;
        menuToggle.firstElementChild.style.hidden = true;
    });
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('active');
            if (toggleCross.classList.contains('active')) {
                ToggleActive(toggleCross, toggleHamburger);
            } else {
                ToggleActive(toggleArrow, toggleHamburger);
            }
            menuFixed = false;
        }
    });

    /* события для пользователя */
    /* появляет окно пользователя по клику на иконку */
    userIcon.addEventListener('click', function () {
        userApp.classList.toggle('active');
    });
    /* скрывает окно пользователя, если тыкаешь где-то на странице */
    document.addEventListener('click', function (event) {
        if (!userApp.contains(event.target) && event.target !== userIcon) {
            userApp.classList.remove('active');
        }
    });
});

function ToggleActive(disabled, activated) {
    disabled.classList.remove('active');
    activated.classList.add('active');
}
