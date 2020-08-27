import Phaser from 'phaser';

export default class PlayGame extends Phaser.Scene{
  
  constructor(){
    super("PlayGame");
  }

  preload = () =>{
  }

  create = () =>{
    console.log('Create is working');
    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
  }
}
