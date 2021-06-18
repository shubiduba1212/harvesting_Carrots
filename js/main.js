'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';


const carrot_count = 5;
const bug_count = 5;
const game_duration_sec = 5;


const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const gameFisnishBanner = new PopUp();
gameFisnishBanner.setClickListener(() => {
  startGame();
});

const gamefield = new Field(carrot_count, bug_count);
gamefield.setClickListener(onItemClick)
function onItemClick(item) {
  if(!started) {
    return;
  }
  if(item === 'carrot') {
    score++;
    updateScoreBoard();
    if(score === carrot_count) {
      finishGame(true);
    }
  } else if(item === 'bug'){    
    finishGame(false);
  }
}

gameBtn.addEventListener('click', () => {
  if(started) {
    stopGame();
  } else {
    startGame();
  }  
});

function startGame() {
  started = true;  
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playbg();
};
function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFisnishBanner.showWithText('REPLAY❓');
  sound.playAlert();
  sound.stopbg();
};

function finishGame(win) {
  started = false;
  hideGameButton();
  if(win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  stopGameTimer();
  sound.stopbg();
  gameFisnishBanner.showWithText(win ? 'YOU WON 🎊' : 'YOU LOST 💥');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
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
      finishGame(carrot_count === score);
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

function initGame() {
  score = 0;
  gameScore.innerText = carrot_count;
  gamefield.init();
}

function updateScoreBoard() {
  gameScore.innerText = carrot_count - score;
}



