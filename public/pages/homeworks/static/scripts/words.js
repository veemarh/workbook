const button = document.getElementById("button");

button.addEventListener("click", (evt) => {
    evt.preventDefault();

    const input = document.getElementById("input");
    const b3 = document.getElementById("block-3");
    b3.innerHTML = "";
    clearItemData();

    if (!input.value.trim()) return;

    const array = getAssociativeArray(input.value);

    array.forEach((word) => {
        const element = document.createElement("div");
        element.classList.add("word");
        const randomColor = getRandomColor();
        element.setAttribute("data-color", randomColor);
        element.textContent = word;
        enableDragAndDrop(element);
        b3.append(element);
    })
});

window.addEventListener('resize', () => resetAllItems());
