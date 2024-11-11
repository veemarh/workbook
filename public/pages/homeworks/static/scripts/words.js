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

function getAssociativeArray(str) {
    const words = str.split('-');
    const result = new Map();

    const lowercaseWords = [];
    const uppercaseWords = [];
    const numbers = [];

    if (words.length === 0) {
        return;
    }

    words.forEach(word => {
        if (!isNaN(word)) {
            numbers.push(Number(word));
        } else {
            const firstChar = word[0];
            if (firstChar === firstChar.toLowerCase()) {
                lowercaseWords.push(word);
            } else if (firstChar === firstChar.toUpperCase()) {
                uppercaseWords.push(word);
            }
        }
    });

    lowercaseWords
        .sort()
        .forEach((word, index) => {
            result.set(`a${index + 1}`, word);
        });

    uppercaseWords
        .sort()
        .forEach((word, index) => {
            result.set(`b${index + 1}`, word);
        });

    numbers
        .sort((a, b) => a - b)
        .forEach((num, index) => {
            result.set(`n${index + 1}`, num.toString());
        });

    return result;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
