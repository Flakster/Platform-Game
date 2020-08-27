import Phaser from 'phaser';
import config from './Config/config';
import PlayGame from './Scenes/PlayGame';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    // this.globals = { score: 0, gameID: '' };
    // this.scene.add('Boot', BootScene);
    // this.scene.add('Preloader', PreloaderScene);
    this.scene.add('PlayGame', PlayGame);
    this.scene.start('PlayGame');
  }
}

window.game = new Game();
console.log('Everything is OK');