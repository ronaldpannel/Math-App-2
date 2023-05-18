const num1 = document.getElementById("num1");
const operator = document.getElementById("operator");
const num2 = document.getElementById("num2");
const answerInput = document.getElementById("userAnswer");
const correctScore = document.getElementById("correctScore");
const wrongAnswer = document.getElementById("wrongAnswer");
const progSlider = document.getElementById("progSlider");
const submitBtn = document.getElementById("submitBtn");
const inputForm = document.getElementById("myForm");
const overlay = document.getElementById("overlay");
const resetBtn = document.getElementById("restartBtn");
const gameOverText = document.getElementById("gameOverText");
const gameWrapper = document.getElementById("wrapper");
const inputs = document.getElementById("inputs");

let state = {
  score: 0,
  wrongAnswers: 3,
};

function updateQuestion() {
  state.currentQuestion = generateQuestion();
  num1.innerHTML = state.currentQuestion.num1;
  operator.innerHTML = state.currentQuestion.operator;
  num2.innerHTML = state.currentQuestion.num2;
  answerInput.value = "";
  answerInput.focus();
}
updateQuestion();

function genRandomNum(max) {
  return Math.floor(Math.random() * max + 1);
}

function generateQuestion() {
  return {
    num1: genRandomNum(10),
    num2: genRandomNum(10),
    operator: ["+", "-", "x"][Math.floor(Math.random() * 3)],
  };
}

inputForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let correctAnswer;
  let p = state.currentQuestion;
  if (p.operator == "+") correctAnswer = p.num1 + p.num2;
  if (p.operator == "-") correctAnswer = p.num1 - p.num2;
  if (p.operator == "x") correctAnswer = p.num1 * p.num2;

  if (answerInput.value == correctAnswer) {
    state.score++;
    correctScore.innerHTML = state.score;
    updateQuestion();
    progSlider.style.transform = `scaleX(${state.score / 10})`;
  } else {
    state.wrongAnswers--;
    wrongAnswer.innerHTML = state.wrongAnswers;
    inputs.classList.add('animateWrong')

    setTimeout(()=>{
        inputs.classList.remove("animateWrong");
    },400)
  }
  gameStatus();
}

function gameStatus() {
  if (state.score == 10) {
    overlay.classList.add("active");
    gameWrapper.classList.add("activeBlur");
    gameOverText.innerText = "Great, You Won";
    setTimeout( () => {
        resetBtn.focus()
    },350)
  }
  if (state.wrongAnswers == 0) {
    overlay.classList.add("active");
    gameWrapper.classList.add("activeBlur");
    gameOverText.innerText = "Sorry, You Lost";
     setTimeout(() => {
       resetBtn.focus();
     }, 350);
  }
}

function resetGame() {
  overlay.classList.remove("active");
   gameWrapper.classList.remove("activeBlur");
  updateQuestion();
  state.score = 0;
  state.wrongAnswers = 3;
  correctScore.innerHTML = 0;
  wrongAnswer.innerHTML = 3;
  progSlider.style.transform = `scaleX(${state.score / 10})`;
}

resetBtn.addEventListener("click", () => {
  resetGame();
});
