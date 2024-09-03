// app.js

const buttonColors = ["#FF4D4D", "#4DFF4D", "#4D4DFF", "#FFFF4D"];
const sounds = [
  new Audio(
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3"
  ),
  new Audio(
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3"
  ),
  new Audio(
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3"
  ),
  new Audio(
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3"
  ),
];

const buttons = Array.from(document.querySelectorAll(".button"));
const message = document.getElementById("message");
const stepNumberDisplay = document.getElementById("stepNumber");
const startButton = document.getElementById("startButton");
const strictButton = document.getElementById("strictButton");
const resetButton = document.getElementById("resetButton");

let sequence = [];
let userSequence = [];
let strictMode = false;
let playerTurn = false;
let step = 0;
let gameOver = false;

// Start Game
function startGame() {
  sequence = [];
  userSequence = [];
  step = 0;
  gameOver = false;
  addStep();
}

// Add Step to Sequence
function addStep() {
  userSequence = [];
  step++;
  stepNumberDisplay.textContent = step;
  const randomColor = Math.floor(Math.random() * 4);
  sequence.push(randomColor);
  playSequence();
}

// Play Sequence
function playSequence() {
  let index = 0;
  const interval = setInterval(() => {
    if (index >= sequence.length) {
      clearInterval(interval);
      playerTurn = true;
      return;
    }
    playSound(sequence[index]);
    buttons[sequence[index]].classList.add("active");
    setTimeout(() => {
      buttons[sequence[index]].classList.remove("active");
    }, 500);
    index++;
  }, 1000);
}

// Handle Button Click
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (playerTurn) {
      playSound(index);
      userSequence.push(index);
      if (index !== sequence[userSequence.length - 1]) {
        if (strictMode) {
          message.textContent = "Wrong! Restarting...";
          setTimeout(startGame, 1000);
        } else {
          message.textContent = "Wrong! Try Again.";
          playerTurn = false;
          setTimeout(playSequence, 1000);
        }
        return;
      }
      if (userSequence.length === sequence.length) {
        if (sequence.length === 20) {
          message.textContent = "You Win!";
          gameOver = true;
          return;
        }
        message.textContent = "Correct! Next Step...";
        playerTurn = false;
        setTimeout(addStep, 1000);
      }
    }
  });
});

// Play Sound
function playSound(index) {
  sounds[index].play();
}

// Strict Mode Toggle
strictButton.addEventListener("click", () => {
  strictMode = !strictMode;
  strictButton.textContent = strictMode ? "Strict Mode On" : "Strict Mode Off";
});

// Reset Game
resetButton.addEventListener("click", startGame);

// Initialize Game
startButton.addEventListener("click", () => {
  if (!gameOver) {
    startGame();
  }
});
