const content = document.getElementById('toggle-content');
const button = document.getElementById('toggle-button');

function toggleContent() {
    content.classList.toggle('visible');
    if (content.classList.contains('visible')) {
        button.textContent = 'Скрыть';
    } else {
        button.textContent = 'Посмотреть задание';
    }
}

button.addEventListener('click', () => toggleContent());
