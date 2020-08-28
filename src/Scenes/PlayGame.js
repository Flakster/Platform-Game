import Phaser from 'phaser';
import Player from '../Entities/Player';


let player;
let cursors;
let platform;

export default class PlayGame extends Phaser.Scene{
  
  constructor(){
    super("PlayGame");
  }

  preload = () =>{


  }

  create = () =>{
    this.add.image(400, 300, 'sky');
    platform = this.physics.add.staticGroup();
    platform.create(400, 268, 'ground').setScale(2).refreshBody();
    player = this.physics.add.sprite(200, 150, 'p1');
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platform);

    this.anims.create({
        key: 'left',
      frames: this.anims.generateFrameNumbers('p1', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'p1', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('p1', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: [ { key: 'p1', frame: 13} ],
      frameRate: 10,
    });

    this.anims.create({
      key: 'squat',
      frames: [ { key: 'p1', frame: 12} ],
      frameRate: 10,
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platform);

  }

  update = () =>{

    if (player.body.touching.down)
    {
      player.anims.play('right', true);
    }
    else
    {
      player.anims.play('jump',true)
    }
    
    
    if (cursors.up.isDown && player.body.touching.down)
    {
      player.setVelocityY(-300);
    }

    if (cursors.down.isDown && player.body.touching.down)
    {
      player.anims.play('squat',true)
    }
  }

}
