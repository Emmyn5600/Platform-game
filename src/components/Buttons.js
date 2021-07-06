import {
  usernameForm,
  leaderboardBtn,
  lbackBtn,
  startBtn,
  playBtn,
  pauseBtn,
  menuBtn,
} from '../helpers_api/data';
import { saveUser } from './app';


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
