import Phaser from 'phaser';

export default class PlayGame extends Phaser.Scene{
  
  constructor(){
    super("PlayGame");
  }

  preload = () =>{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('p1', 
    'assets/p1-spritesheet.png',
    { frameWidth: 72, frameHeight: 98 }
);
  }

  create = () =>{
    this.add.image(400, 300, 'sky');
  }
}
