function getAssociativeArray(str) {
    const words = str.split('-');
    const result = new Map();

    const lowercaseWords = [];
    const uppercaseWords = [];
    const numbers = [];

    if (words.length === 0) {
        return;
    }

    const isNumber = /^\d+$/;
    const isLowercaseWord = /^[a-z]+$/;
    const isUppercaseWord = /^[A-Z][a-z]*$/;

    words.forEach(word => {
        word = word.trim();
        if (isNumber.test(word)) {
            numbers.push(Number(word));
        } else if (isLowercaseWord.test(word)) {
            lowercaseWords.push(word);
        } else if (isUppercaseWord.test(word)) {
            uppercaseWords.push(word);
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
