const fullQuestionSet = [
  { question: "Which law is used to find thermal efficiency of an engine?", answers: [ { text: "Boyle’s law", correct: false }, { text: "Newton’s law", correct: false }, { text: "Carnot’s law", correct: true }, { text: "Pascal’s law", correct: false } ] },
  { question: "Which metal is used in aircraft structures?", answers: [ { text: "Aluminum", correct: true }, { text: "Copper", correct: false }, { text: "Lead", correct: false }, { text: "Iron", correct: false } ] },
  { question: "Which device converts mechanical energy to electrical energy?", answers: [ { text: "Compressor", correct: false }, { text: "Motor", correct: false }, { text: "Generator", correct: true }, { text: "Pump", correct: false } ] },
  { question: "SI unit of pressure is?", answers: [ { text: "Pascal", correct: true }, { text: "Newton", correct: false }, { text: "Watt", correct: false }, { text: "Bar", correct: false } ] },
  { question: "Which cycle is used in gas turbines?", answers: [ { text: "Otto cycle", correct: false }, { text: "Brayton cycle", correct: true }, { text: "Diesel cycle", correct: false }, { text: "Rankine cycle", correct: false } ] },
  { question: "Which engine component connects piston to crankshaft?", answers: [ { text: "Cylinder", correct: false }, { text: "Connecting rod", correct: true }, { text: "Camshaft", correct: false }, { text: "Valve", correct: false } ] },
  { question: "Hardness of a material is measured using?", answers: [ { text: "Tensile test", correct: false }, { text: "Brinell test", correct: true }, { text: "Fatigue test", correct: false }, { text: "Impact test", correct: false } ] },
  { question: "Which process is used to join metals?", answers: [ { text: "Welding", correct: true }, { text: "Casting", correct: false }, { text: "Milling", correct: false }, { text: "Drilling", correct: false } ] },
  { question: "The part which stores energy in mechanical systems?", answers: [ { text: "Governor", correct: false }, { text: "Flywheel", correct: true }, { text: "Brake", correct: false }, { text: "Clutch", correct: false } ] },
  { question: "Which instrument measures temperature?", answers: [ { text: "Manometer", correct: false }, { text: "Thermometer", correct: true }, { text: "Barometer", correct: false }, { text: "Tachometer", correct: false } ] },
  { question: "Lathe machine is used for?", answers: [ { text: "Welding", correct: false }, { text: "Turning", correct: true }, { text: "Drilling", correct: false }, { text: "Casting", correct: false } ] },
  { question: "Casting is done for?", answers: [ { text: "Machining parts", correct: false }, { text: "Joining parts", correct: false }, { text: "Shaping molten metal", correct: true }, { text: "Assembling", correct: false } ] },
  { question: "Rankine cycle is used in?", answers: [ { text: "Petrol engine", correct: false }, { text: "Diesel engine", correct: false }, { text: "Steam power plant", correct: true }, { text: "Gas turbine", correct: false } ] },
  { question: "Crankshaft rotates due to?", answers: [ { text: "Spark plug", correct: false }, { text: "Piston movement", correct: true }, { text: "Camshaft", correct: false }, { text: "Valve timing", correct: false } ] },
  { question: "Hydraulic press works on?", answers: [ { text: "Bernoulli’s law", correct: false }, { text: "Pascal’s law", correct: true }, { text: "Ohm’s law", correct: false }, { text: "Newton’s law", correct: false } ] },
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const quizContainer = document.querySelector(".quiz");
const dropdown = document.getElementById("question-count");

startButton.addEventListener("click", () => {
  const count = parseInt(dropdown.value);
  startQuiz(count);
});

function startQuiz(count) {
  selectedQuestions = shuffle([...fullQuestionSet]).slice(0, count);
  currentQuestionIndex = 0;
  score = 0;
  startButton.style.display = "none";
  dropdown.style.display = "none";
  quizContainer.style.display = "block";
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = selectedQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
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
  Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
          button.classList.add("correct");
      }
      button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${selectedQuestions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
      showQuestion();
  } else {
      showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < selectedQuestions.length) {
      handleNextButton();
  } else {
      // Reset for replay
      quizContainer.style.display = "none";
      dropdown.style.display = "block";
      startButton.style.display = "block";
  }
});

// Utility to shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
