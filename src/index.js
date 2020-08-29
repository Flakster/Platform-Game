import Phaser from 'phaser';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import PlayGame from './Scenes/PlayGame';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = { score: 0 };
    const model = new Model();
    this.globals = { model };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('PlayGame', PlayGame);
    this.scene.start('Boot');
  }
}

window.game = new Game();