const imageElement = document.getElementById('image');
const messageElement = document.getElementById('message');
const images = [
    '../static/img/cw1.jpg',
    '../static/img/cw2.jpg',
    '../static/img/cw3.jpg',
    '../static/img/cw4.jpg',
    '../static/img/cw5.jpg'
];
const messages = [
    `Курсовая сейчас находится на этапе разработки... ну, или только <strong>собирается начаться</strong>. Загляните позже, она обязательно появится!`,
    'Курсовая в процессе создания. Пока наслаждайтесь <strong>тишиной и спокойствием</strong> этой страницы.',
    'Мы работаем над этим... Курсовая <strong>скоро будет здесь</strong>. Оставайтесь на связи!',
    'Oops! Курсовая задерживается. Она еще <strong>на стадии идеи</strong>. Приходите чуть позже, и мы поделимся результатом.',
    'Кажется, курсовая еще не родилась. Займитесь чем-то <strong>приятным</strong>, пока она готовится.'
];

function setRandomContent() {
    imageElement.src = images[Math.floor(Math.random() * images.length)];
    messageElement.innerHTML = messages[Math.floor(Math.random() * messages.length)];
}

setRandomContent();
