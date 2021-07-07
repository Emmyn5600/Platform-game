/* eslint-disable no-undef */
import gameConfig from './config';
import { saveScoreInfo } from './control';

const game = new Phaser.Game(gameConfig);
let score = 0;

const startScene = {
  preload() {
    game.load.image('background', '../assets/images/toy.png');
  },
  create() {
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    const info = 'Control a plane with "SPACE", Pause with "P"';
    game.add.text(game.world.centerX - 300, 450, info, { font: '30px Bauhaus', fontWeight: 800, fill: '#006633' });
  },
};

const playingScene = {
  preload() {
    game.load.image('plane', '../assets/images/toy.png');
    game.load.image('pipe', '../assets/images/pipe.png');
    game.load.image('background', '../assets/images/background.png');
  },
  create() {
    game.add.tileSprite(0, 0, 1000, 600, 'background');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.plane = game.add.sprite(100, 245, 'plane');
    game.physics.arcade.enable(this.plane);
    this.plane.body.gravity.y = 1000;

    const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
    spaceKey.onDown.add(this.jump, this);
    const pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    pKey.onDown.add(this.pause, this);

    this.pipes = game.add.group();
    this.timer = game.time.events.loop(2000, this.addRowOfPipes, this);
    score = 0;
    this.labelScore = game.add.text(20, 20, '0', { font: '30px Arial', fill: '#fff' });
    this.plane.width = 68;
    this.plane.height = 55;
  },
  pause() {
    if (game.paused) {
      game.paused = false;
    } else {
      game.paused = true;
    }
  },
  update() {
    if (this.plane.y < 0 || this.plane.y > 520) {
      this.gameOver();
    }
    game.physics.arcade.overlap(this.plane, this.pipes, this.gameOver, null, this);
  },
  jump() {
    this.plane.body.velocity.y = -350;
  },
  restartGame() {
    game.state.start('playingScene');
  },
  addOnePipe(x, y) {
    const pipe = game.add.sprite(x, y, 'pipe');
    this.pipes.add(pipe);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },
  addRowOfPipes() {
    const hole = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < 10; i += 1) {
      if (i !== hole && i !== hole + 1) {
        this.addOnePipe(1000, i * 100 + 10);
      }
    }
    score += 100;
    this.labelScore.text = score;
  },
  gameOver() {
    game.state.start('gameOverScene');
    if (score > 0) {
      saveScoreInfo(score);
    }
  },
};

const gameOverScene = {
  preload() {
    game.load.image('gameover', '../assets/images/gameover.png');
  },
  create() {
    game.stage.backgroundColor = '#CCFF66';
    this.gameover = game.add.sprite(game.world.centerX - 280, 150, 'gameover');
    this.labelScore = game.add.text(game.world.centerX - 70, 250, `${score}`, { font: '80px Bauhaus', fontWeight: 800, fill: '#59CB42' });
  },
};
game.state.add('startScene', startScene);
game.state.add('playingScene', playingScene);
game.state.add('gameOverScene', gameOverScene);

export const startGame = () => {
  game.state.start('startScene');
};

export const pause = () => {
  if (!game.paused) {
    game.paused = true;
  }
};

export const play = () => {
  if (game.paused) {
    game.paused = false;
  } else {
    game.state.start('playingScene');
  }
};
