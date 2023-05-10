const questions = [
  {
    question: "Which of the following is not a keyword in Java ?",
    answers: [
      { text: "static", correct: false },
      { text: "void", correct: false },
      { text: "Boolean", correct: true },
      { text: "private", correct: false },
    ],
  },
  {
    question: "What is the size of long variable?",
    answers: [
      { text: "32 bit", correct: false },
      { text: "64 bit", correct: true },
      { text: "16 bit", correct: false },
      { text: "8 bit", correct: false },
    ],
  },
  {
    question: "Method overriding is an example of",
    answers: [
      { text: "Dynamic Binding", correct: true },
      { text: "Static Binding", correct: false },
      { text: "Both of the above", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What is the default value of float variable?",
    answers: [
      { text: "not defined", correct: false },
      { text: "0", correct: false },
      { text: "0.0d", correct: false },
      { text: "0.0f", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
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
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
