let userInfo = document.querySelectorAll('.homework-info');

/* обрезка данных */
userInfo.forEach(data => {
    isOverflown(data) && data.classList.add('overflow-data');
});

/* проверить размер данных в карточке */
function isOverflown(elem) {
    return elem.scrollHeight > elem.clientHeight;
}