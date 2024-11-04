// весь контент, который помещается на странице, будет загружен сразу
window.addEventListener('DOMContentLoaded', () => {
    let dynamicBlocks = document.querySelectorAll('.hidden-dynamic-up');
    dynamicBlocks.forEach(block => {
        let rect = block.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            block.classList.remove('hidden-dynamic-up');
        } else {
            return 0;
        }
    });
});
// все остальное возникнет при прокрутке
window.addEventListener('scroll', () => {
    let dynamicBlock = document.querySelector('.hidden-dynamic-up');
    let rect = dynamicBlock.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        dynamicBlock.classList.remove('hidden-dynamic-up');
    }
});

