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
