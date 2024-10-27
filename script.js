let questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Markup List", correct: false },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false }
        ]
    },
    {
        question: "Which programming language is primarily used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "What is the correct syntax to create a function in JavaScript?",
        answers: [
            { text: "function myFunction()", correct: true },
            { text: "create myFunction()", correct: false },
            { text: "def myFunction()", correct: false },
            { text: "function:myFunction()", correct: false }
        ]
    },
    {
        question: "Which of the following is a front-end framework?",
        answers: [
            { text: "Django", correct: false },
            { text: "Flask", correct: false },
            { text: "React", correct: true },
            { text: "Node.js", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in Python?",
        answers: [
            { text: "//", correct: false },
            { text: "#", correct: true },
            { text: "/*", correct: false },
            { text: "<!--", correct: false }
        ]
    },
    {
        question: "What is the purpose of a database?",
        answers: [
            { text: "To store data", correct: true },
            { text: "To compile code", correct: false },
            { text: "To design web pages", correct: false },
            { text: "To run applications", correct: false }
        ]
    },
    {
        question: "Which data structure uses LIFO (Last In First Out)?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false }
        ]
    }
];


let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetQuiz();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetQuiz();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
    });
}

function resetQuiz() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    let selectedButton = e.target;
    let isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetQuiz();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

startQuiz();