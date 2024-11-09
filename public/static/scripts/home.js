document.addEventListener("DOMContentLoaded", function () {
    // Проверка элементов при загрузке страницы
    function checkAndRevealElements() {
        let dynamicBlocks = document.querySelectorAll('.hidden-dynamic-up');
        dynamicBlocks.forEach(block => {
            let rect = block.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                block.classList.remove('hidden-dynamic-up');
            }
        });

        // Если больше нет элементов с классом, удаляем обработчик скролла
        if (document.querySelectorAll('.hidden-dynamic-up').length === 0) {
            window.removeEventListener('scroll', onScroll);
        }
    }

    // Обработчик скролла
    function onScroll() {
        let dynamicBlock = document.querySelector('.hidden-dynamic-up');
        if (dynamicBlock) {
            let rect = dynamicBlock.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                dynamicBlock.classList.remove('hidden-dynamic-up');
            }
        }

        // Проверяем, остались ли ещё элементы и удаляем обработчик при необходимости
        if (document.querySelectorAll('.hidden-dynamic-up').length === 0) {
            window.removeEventListener('scroll', onScroll);
        }
    }

    checkAndRevealElements();
    window.addEventListener('scroll', onScroll);
});
