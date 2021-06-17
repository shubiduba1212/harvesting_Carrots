'use strict';
const carrot_Size = 80;
const carrot_count = 5;
const bug_count = 5;
const game_duration_sec = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpText = document.querySelector('.pop-up__message');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if(started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
};
function stopGame() {
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY❓');
};

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
} 

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = game_duration_sec;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if(remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000)
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
  console.log(popUp.classList);
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = carrot_count;
  addItem('carrot', carrot_count, '/img/carrot.png');
  addItem('bug', bug_count, '/img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - carrot_Size;
    const y2 = fieldRect.height - carrot_Size;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      field.appendChild(item);
    }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


