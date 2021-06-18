'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import {GameBuilder, Reason} from './game.js';

const gameFisnishBanner = new PopUp();
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(5)
.bugCount(3)
.build();

game.setGameStartListener((reason) => {
  let message;
  switch(reason) {
    case Reason.cancel:
      sound.playAlert();
      message = 'REPLAY❓';
      break;
    case Reason.win:
      sound.playWin();
      message = 'YOU WON 🎊';
      break;
    case Reason.lose:
      sound.playBug();
      message = 'YOU LOST 💥';
      break;
      default:
        throw new Error('not valid reason');   
  }
  gameFisnishBanner.showWithText(message);  
});

gameFisnishBanner.setClickListener(() => {
  game.start();
})