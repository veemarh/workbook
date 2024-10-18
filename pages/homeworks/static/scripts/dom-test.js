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
        answerBlock.addEventListener('click', () => handleAnswerClick(shuffledAnswers[i], currentQuestion, () => getQuestionCloneCallback(currentQuestion), event));
        answers.append(answerBlock);
    }
}

// обрабатываем выбор ответа
function handleAnswerClick(answer, question, callback, event) {
    // создаем маркер
    let svg = document.createElement('div');
    svg.classList.add('svg');

    if (answer === question.right) {
        svg.classList.add('flag');
        event.target.classList.add('fun');
        explanation.textContent = question.explanation;
        explanation.classList.remove('disable');
    } else {
        svg.classList.add('cross');
    }

    // роняем неправильные ответы
    for (let answerBlock of answers.children) {
        if (answerBlock.textContent !== question.right || answerBlock !== event.target) {
            setTimeout(() => {
                answerBlock.classList.add('wrong');
            }, (answerBlock.getAttribute('id')) * 200);
        }
    }
    marker.append(svg);

    currentQuestionIndex++;
    setTimeout(loadQuestion, 2000);
    callback(question);
}

// выводим ответ на вопрос
function handleQuestionClick(wrapper, question) {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('block', 'correct-answer');
    answerDiv.textContent = question.right;
    wrapper.append(answerDiv);
}

// записываем в статистику
function getQuestionCloneCallback(currQuestion) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    let clone = question.parentElement.cloneNode(true);
    clone.addEventListener('click', () => handleQuestionClick(wrapper, currQuestion), {once: true});
    wrapper.append(clone);
    stats.append(wrapper);
}

// генерация случайного порядка элементов массива
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// вопросы
const QUIZ = [
    {
        id: 0,
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        answers: [
            "пол деревни, за раз",
            "полдеревни, зараз",
            "пол-деревни, за раз",
        ],
        right: "полдеревни, зараз",
        explanation: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
    },
    {
        id: 1,
        question: "А эти слова как пишутся?",
        answers: [
            "капуччино и эспрессо",
            "каппуччино и экспресо",
            "капучино и эспрессо",
        ],
        right: "капучино и эспрессо",
        explanation: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».",
    },
    {
        id: 2,
        question: "Как нужно писать?",
        answers: [
            "черезчур",
            "черес-чур",
            "чересчур",
        ],
        right: "чересчур",
        explanation: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур».",
    },
    {
        id: 3,
        question: "Где допущена ошибка?",
        answers: [
            "аккордеон",
            "белиберда",
            "эпелепсия",
        ],
        right: "эпелепсия",
        explanation: "Верно! Это слово пишется так: «эпИлепсия».",
    }
]
