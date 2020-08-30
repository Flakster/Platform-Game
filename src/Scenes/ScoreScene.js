/* eslint-disable import/no-extraneous-dependencies */

import 'regenerator-runtime';
import Phaser from 'phaser';
import api from '../Utils/api';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  preload = () => {

  };

  create = () => {
    this.scoreInfo = this.add.text(400, 100, `Your score : ${this.sys.game.globals.score}`, { fontSize: '30px', fill: '#FFF' });
    this.scoreInfo.setOrigin(0.5);
    this.msgName = this.add.text(400, 160, 'Please enter your name and hit <enter>', { fontSize: '20px', fill: '#FFF' });
    this.msgName.setOrigin(0.5);

    const userText = document.getElementById('utext');
    userText.style.display = 'block';
    userText.style.position = 'absolute';
    userText.style.top = '220px';
    userText.style.left = '322px';
    userText.focus();

    this.keyENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
  };

  update = () => {
    const userText = document.getElementById('utext');
    if (this.keyENTER.isDown) {
      this.prepareData(userText.value);
      userText.style.display = 'none';
    }
  };

  prepareData = (name) => {
    if (this.sys.game.globals.score > 0) {
      if (name === '') {
        name = 'Anonymous';
      }
      api.setScore(name, this.sys.game.globals.score);
    }

    this.scoreInfo = this.add.text(400, 280, 'Updating scores....', { fontSize: '20px', fill: '#FFF' });
    this.scoreInfo.setOrigin(0.5);
    this.sys.game.globals.score = 0;
    this.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.start('LeaderBoard');
      },
      callbackScope: this,
      loop: false,
    });
  }
}