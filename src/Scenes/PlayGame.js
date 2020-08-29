import Phaser from 'phaser';
import Fly from '../Entities/Fly';
import Slime from '../Entities/Slime';

let player;
let cursors;
let platform;
let speed = -200;

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
    player.setGravityY(900);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platform);

    this.baddies = this.add.group();

    //this.score = this.sys.game.globals.score;
    this.score = 0;
    this.leaderBoard = this.add
    .bitmapText(10, 10, 'arcade', `Score: ${this.score}`, 14)
    .setTint(0xCCCCCC);

    this.gameOverText = this.add.text(400,70,'Game Over',{fontSize:'50px',fill:'#FFF'});
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;

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

    this.anims.create({
      key: 'hurt',
      frames: [ { key: 'p1', frame: 6} ],
      frameRate: 10,
    });

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('fly', { start: 0, end: 1 }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platform);
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
    this.bgMusic.play();
    let temp = 0;

    this.time.addEvent({
      delay:1000,
      callback() {
        let badGuy = null;
        let ran = Phaser.Math.Between(0, 2);
        switch(ran){
          case 0: badGuy = new Fly(this,900,140,'fly');
            break;
          case 1: badGuy = new Slime(this,900, 222, 'slime')
            break;
        }
        if (badGuy !== null){
          this.baddies.add(badGuy);
        }

        for (let i = 0; i < this.baddies.getChildren().length; i += 1){
          const badGuy = this.baddies.getChildren()[i];
          if(badGuy.creature === 'FLY'){
            badGuy.anims.play('fly',true);
          }
          else{
            badGuy.anims.play('walk',true);
          }
          if ((this.score >= 50) && (this.score % 50) === 0){
            speed -= 25;
          }

          badGuy.body.velocity.x = speed;

          // disposal of the baddies

          if (badGuy.x < 30){
            this.score += 10;
            this.leaderBoard.setText(`SCORE: ${this.score}`);
            badGuy.destroy();
          }
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  update = () =>{
    let last = 0; 
    for (let i = 0; i < this.baddies.getChildren().length; i += 1){
      const badGuy = this.baddies.getChildren()[i];

      if (badGuy.x > 400){
        if (badGuy.x - last < 5){
          badGuy.destroy();
          last = 0;
        }
        else
        {
          last = badGuy.x;
        }
      }

      if (badGuy.x > 190 && badGuy.x < 210){
        if(badGuy.creature === 'FLY'){
          if (!cursors.down.isDown || player.y < 160 ){
            player.anims.play('hurt',true);
            this.die();
          }
        }
        else if (player.y > 160){
          this.die();
        }

      }
    }

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
      player.setVelocityY(-350);
    }

    if (cursors.down.isDown && player.body.touching.down)
    {
      player.anims.play('squat',true)
    }



  }

  die = () => {
    this.physics.pause();
    this.gameOverText.visible = true;
    this.bgMusic.stop();
    this.time.addEvent({
      delay:2000,
      callback() {
        this.scene.start('Title');
      },
      callbackScope: this,
      loop: false,
    });
  }

}
