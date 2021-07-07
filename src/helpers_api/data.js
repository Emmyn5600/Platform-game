export default class Element {
  find(value) {
    this.elm = document.querySelector(value);
    return this;
  }

  get() {
    return this.elm;
  }

  setText(text) {
    this.elm.innerHTML = text;
    return this;
  }

  create(name) {
    this.elm = document.createElement(name);
    return this;
  }

  parse(value) {
    const parser = new DOMParser();
    this.elm = parser.parseFromString(value, 'text/html').body;
    return this;
  }

  hide() {
    this.elm.style.display = 'none';
    return this;
  }

  show(d) {
    this.elm.style.display = d;
    return this;
  }
}

export const welcomeContent = new Element().find('#welcome-content');
export const gameContainer = new Element().find('#game-container');

export const usernameDiv = new Element().find('#username-div');
export const optionBtns = new Element().find('#option-btns');
export const leaderboard = new Element().find('#leaderboard');

export const leaderboardData = new Element().find('#leaderboard-data');

export const usernameForm = new Element().find('#username-form');
export const startBtn = new Element().find('#start-btn');
export const leaderboardBtn = new Element().find('#leaderboard-btn');
export const lbackBtn = new Element().find('#l-back-btn');

export const playBtn = new Element().find('#play-btn');
export const pauseBtn = new Element().find('#pause-btn');
export const menuBtn = new Element().find('#menu-btn');

export const saveLoading = new Element().find('#save-loading');
export const gameBtnsC = new Element().find('#game-btns-c');
