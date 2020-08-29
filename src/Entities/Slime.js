import Phaser from 'phaser';
import Entity from './Entities';

class Slime extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'slime', 'Slime');
    this.creature = 'SLIME';
  }
}

export default Slime;