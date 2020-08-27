import Phaser from 'phaser';
import Player from '../Entities/Player';

export default class PlayGame extends Phaser.Scene{
  
  constructor(){
    super("PlayGame");
  }

  preload = () =>{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('p1', 
      'assets/p1_spritesheet.png',
      { frameWidth: 72, frameHeight: 98 }
    );
  }

  create = () =>{
    this.add.image(400, 300, 'sky');
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    // let  player = new Player(      
    //   this,
    //   this.game.config.width * 0.5,
    //   this.game.config.height * 0.5,
    //   'p1'
    // );
    console.log(`value of game.physics is ${game.physics}`);
    let player = this.physics.add.sprite(100, 450, 'p1');
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
    let cursors = this.input.keyboard.createCursorKeys();


    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('p1', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update = () =>{

  }

}
