import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload = () => {
    this.load.image('logoPhaser', 'assets/logo.png');
    this.load.image('logoZenva', 'assets/zenva_logo.png');
    document.getElementById('utext').style.display = 'none';
  };

  create = () => {
    this.scene.start('Preloader');
  };
}