import Phaser from 'phaser';
import Entity from './Entities';

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key,'Player');
  }
}
export default Player;