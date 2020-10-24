const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("#start-button");
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function bonk(e) {
  //the .isTrusted property guarantees it is an actual mouse click and not someone using JS to hack the game
  if (!e.isTrusted) return;
  //if mole's parent hole has class "up" then mole can be clicked,
  //then class "up" is removed to prevent double clicks
  if (this.closest(".hole").classList.value.slice(-2) === "up") score++;
  this.closest(".hole").classList.remove("up");
  scoreBoard.textContent = score;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  upMole = hole.classList.value.slice(-2);
  moles.forEach((mole) => mole.addEventListener("click", bonk));
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  score = 0;
  scoreBoard.textContent = 0;
  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

startButton.addEventListener("click", startGame);
