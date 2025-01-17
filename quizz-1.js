let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const explanationElement = document.getElementById("explanation");
const progressBar = document.getElementById("progress");
const scoreElement = document.getElementById("score");

async function loadQuizData() {
    const response = await fetch("questions.json");
    quizData = await response.json();
    displayQuestion();
}

function displayQuestion() {
    const question = quizData[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(index === question.answer);
        optionsContainer.appendChild(button);
    });

    nextButton.disabled = true;
    explanationElement.textContent = "";
}

function handleAnswer(isCorrect) {
    nextButton.disabled = false;

    if (isCorrect) {
        score++;
        scoreElement.textContent = score;
        explanationElement.textContent = "Bonne réponse ! " + quizData[currentQuestionIndex].explanation;
    } else {
        explanationElement.textContent = "Mauvaise réponse. " + quizData[currentQuestionIndex].explanation;
    }
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        updateProgressBar();
        displayQuestion();
    } else {
        questionElement.textContent = "Quiz terminé !";
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
        explanationElement.textContent = `Votre score final est ${score}/${quizData.length}.`;
    }
};

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progress + "%";
}

loadQuizData();
