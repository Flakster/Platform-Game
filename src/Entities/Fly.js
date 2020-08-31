import Entity from './Entities';

class Fly extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'fly', 'Fly');
    this.creature = 'FLY';
  }
}

export default Fly;