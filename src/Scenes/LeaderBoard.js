/* eslint-disable import/no-extraneous-dependencies */

import 'regenerator-runtime';
import Phaser from 'phaser';
import api from '../Utils/api';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  preload = () => {

  };

  create = () => {
    try {
      this.retrieveScores(api.getScore());
    } catch (error) {
      return error;
    }

    this.scoreInfo = this.add.text(400, 30, 'High Scores', { fontSize: '30px', fill: '#FFF' });
    this.scoreInfo.setOrigin(0.5);

    this.keyENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
    return true;
  };

  update = () => {
    if (this.keyENTER.isDown) {
      this.scene.start('Title');
    }
  };

  retrieveScores = async (data) => {
    const objectData = await (data);
    objectData.result.sort(((a, b) => b.score - a.score));

    let pos = 0;
    let posy = 40;
    this.time.addEvent({
      delay: 200,
      callback() {
        posy += 37;
        this.add.text(200, posy, `${pos + 1}.`);
        this.add.text(230, posy, `${objectData.result[pos].user.slice(0, 10)}`);
        this.add.text(330, posy, '........................');
        this.add.text(580, posy, objectData.result[pos].score);
        pos += 1;
      },
      callbackScope: this,
      repeat: 4,
    });

    this.time.addEvent({
      delay: 2000,
      callback() {
        this.continueText = this.add.text(400, 280, 'Hit <enter> to continue');
        this.continueText.setOrigin(0.5);
      },
      callbackScope: this,
      loop: false,
    });
  }
}