let quiz = document.getElementById("quiz");
let form = document.getElementById("form");
let number = document.getElementById("number");
let question = document.querySelector(".question-text");
let answers = document.getElementById("answers");
let explanation = document.getElementById("explanation");
let marker = document.querySelector(".marker");

let currentQuestionIndex, shuffledQuiz, stats;

// запуск
document.addEventListener('DOMContentLoaded', function () {
    stats = document.createElement('div');
    stats.classList.add('stats');
    currentQuestionIndex = 0;
    shuffledQuiz = shuffleArray(QUIZ);
    loadQuestion();
});

// загрузка викторины
function loadQuestion() {
    // выход, если вопросы закончились
    if (currentQuestionIndex >= shuffledQuiz.length) {
        form.classList.add('disable');
        quiz.append(stats);
        return;
    }

    // перемещаемся по вопросам
    // обновление и очистка данных
    const currentQuestion = shuffledQuiz[currentQuestionIndex];
    explanation.classList.add('disable');
    number.textContent = `Вопрос #${currentQuestionIndex + 1}`;
    question.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    marker.innerHTML = '';
    answers.innerHTML = '';

    // перемешиваем ответы
    const shuffledAnswers = shuffleArray(currentQuestion.answers);

    // создаем блоки ответов
    for (let i = 0; i < shuffledAnswers.length; i++) {
        const answerBlock = document.createElement('div');
        answerBlock.classList.add('block', 'answer');
        answerBlock.setAttribute('id', `${i}`);
        answerBlock.textContent = shuffledAnswers[i];
        answerBlock.addEventListener('click', (event) => handleAnswerClick(currentQuestion, event));
        answers.append(answerBlock);
    }
}

// обрабатываем выбор ответа
function handleAnswerClick(currQuest, event) {
    // создаем маркер
    let svg = document.createElement('div');
    svg.classList.add('svg');

    if (event.target.textContent === currQuest.right) {
        svg.classList.add('flag');
        event.target.classList.add('fun');
        explanation.textContent = currQuest.explanation;
        explanation.classList.remove('disable');
    } else {
        svg.classList.add('cross');
    }

    // роняем неправильные ответы
    for (let answerBlock of answers.children) {
        if (answerBlock.textContent !== currQuest.right || answerBlock !== event.target) {
            setTimeout(() => {
                answerBlock.classList.add('wrong');
            }, (answerBlock.getAttribute('id')) * 200);
        }
    }
    marker.append(svg);

    currentQuestionIndex++;
    setTimeout(loadQuestion, 2000);
    getQuestionCloneCallback(currQuest);
}

// выводим ответ на вопрос
function handleQuestionClick(wrapper, currQuest) {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('block', 'correct-answer');
    answerDiv.textContent = currQuest.right;
    wrapper.append(answerDiv);
}

// записываем в статистику
function getQuestionCloneCallback(currQuest) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    let clone = question.parentElement.cloneNode(true);
    clone.addEventListener('click', () => handleQuestionClick(wrapper, currQuest), {once: true});
    wrapper.append(clone);
    stats.append(wrapper);
}

// генерация случайного порядка элементов массива
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
