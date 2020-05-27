const game = document.querySelector("#game");
const startButton = document.querySelector("#startButton");
const changeTimeButton = document.querySelector("#changeTimeButton");
const timeInput = document.querySelector("#timeInput");
const time = document.querySelector("#gameTime");
const counter = document.querySelector("#gameCounter");

let count = 0;
let isGameStarted = false;

const changeTime = (event) => {
  event.preventDefault;
  time.textContent = timeInput.value + ".0";
};

const startGame = () => {
  if (time.textContent > 0 && time.textContent <= 100) {
    isGameStarted = true;
    counter.textContent = "0";
    count = 0;

    game.style.backgroundColor = "#fff";
    startButton.style.display = "none";
    startButton.style.visibility = "hidden";
    changeTimeButton.setAttribute("disabled", "disabled");
    timeInput.style.opacity = ".5";

    createBox();

    const interval = setInterval(() => {
      const timer = parseFloat(time.textContent);
      if (timer <= 0) {
        clearInterval(interval);
        endGame();
      } else {
        time.textContent = (timer - 0.1).toFixed(1);
      }
    }, 100);
  } else {
    timeInput.focus();
  }
};

const endGame = () => {
  isGameStarted = false;
  game.style.backgroundColor = "#4CAF50";
  changeTimeButton.removeAttribute("disabled", "disabled");
  timeInput.style.opacity = "1";
  game.innerHTML = "";
  time.textContent = timeInput.value + ".0";

  let startInterval = setInterval(function () {
    startButton.style.display = "block";
    startButton.style.visibility = "visible";
    startButton.textContent = "もう1度遊ぶ";
    clearInterval(startInterval);
  }, 1000);
};

const createBox = () => {
  game.innerHTML = "";
  const box = document.createElement("div");
  const boxSize = randomNum(30, 100);
  const gameSize = game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;

  box.style.width = box.style.height = boxSize + "px";
  box.style.backgroundColor = randomColor();
  box.style.position = "absolute";
  box.style.left = randomNum(0, maxLeft) + "px";
  box.style.top = randomNum(0, maxTop) + "px";
  box.style.cursor = "pointer";

  game.appendChild(box);

  box.addEventListener("click", changeBox);
};

const changeBox = () => {
  createBox();
  count++;
  counter.textContent = count;
};

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

startButton.addEventListener("click", startGame);
changeTimeButton.addEventListener("click", changeTime);
