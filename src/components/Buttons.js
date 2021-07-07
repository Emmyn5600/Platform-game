import {
  usernameForm,
  leaderboardBtn,
  lbackBtn,
  startBtn,
  playBtn,
  pauseBtn,
  menuBtn,
} from '../helpers_api/element.js';
import { saveUser } from './app.js';
import { switchComponents, switchSections } from './control.js';
import { play, pause, startGame } from './game.js';

usernameForm.get().addEventListener('submit', saveUser);
leaderboardBtn.get().addEventListener('click', () => {
  switchComponents('leaderboard');
});
lbackBtn.get().addEventListener('click', () => {
  switchComponents('options');
});
startBtn.get().addEventListener('click', () => {
  switchSections('game-s');
});
playBtn.get().addEventListener('click', () => {
  play();
});
pauseBtn.get().addEventListener('click', () => {
  pause();
});
menuBtn.get().addEventListener('click', () => {
  startGame();
  switchSections('welcome-s');
});
