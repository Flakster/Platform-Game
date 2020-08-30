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

    this.sys.game.globals.score = 0;
    this.scoreText = this.add.text(15,15,'score: 0',{fontSize:'30px',fill:'#FFF'});

    this.gameOverText = this.add.text(400,70,'Game Over',{fontSize:'50px',fill:'#FFF'});
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;

    // animations

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
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
    this.bgMusic.play();

    // Baddies creation timed loop
    this.time.addEvent({
      delay:1000,
      callback() {
        let badGuy = null;
        let random = Phaser.Math.Between(0, 2);
        switch(random){
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

          // game speed increase 
          speed = -300 - this.sys.game.globals.score;
          badGuy.body.velocity.x = speed;

          // disposal of the baddies
          if (badGuy.x < 30){
            this.sys.game.globals.score += 10;
            this.scoreText.setText(`Score: ${this.sys.game.globals.score}`);
            badGuy.destroy();
          }
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  update = () =>{

    // check that flies and slimes don't show up at the same time   
    let last = 0;
    let pos = 0;
    let arrowDownPressed = false;
    for (let i = 0; i < this.baddies.getChildren().length; i += 1){
      const badGuy = this.baddies.getChildren()[i];
      if (badGuy.x > 400){
        if (badGuy.x - last < 4){
          badGuy.destroy();
          last = 0;
        }
        else
        {
          last = badGuy.x;
        }
      }

      // check collides
      pos = player.y;
      arrowDownPressed = cursors.down.isDown
      if (badGuy.x > 190 && badGuy.x < 210){
        if(badGuy.creature === 'FLY'){
          if (this.touchFly(pos,arrowDownPressed)){
            this.die();
          }
        }
          else if (this.touchSlime(pos)){
            this.die();
          }
      }
    }

    // play animations according with the user input
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

  touchFly = (y, key) => {
    if (!key || y < 160){
      return true;
    } else{
      return false;
    }
  }

  touchSlime = (y) => {
    if (y > 160){
      return true;
    } else{
      return false;
    }
  }

  die = () => {
    this.physics.pause();
    this.gameOverText.visible = true;
    this.bgMusic.stop();
    this.time.addEvent({
      delay:1500,
      callback() {
        this.scene.start('Score');
      },
      callbackScope: this,
      loop: false,
    });
  }
}
