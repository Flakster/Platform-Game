import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create = () => {
    // Game
    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('PlayGame');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton = (gameObject, offset = 0) => {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        this.game.config.width / 2,
        this.game.config.height / 2 - offset * 50,
        this.game.config.width,
        this.game.config.height,
      ),
    );
  }

  centerButtonText = (gameText, gameButton) => {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
