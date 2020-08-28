export default {
  type: Phaser.AUTO,
  width: 800,
  height: 300,
  scene: [],
  backgroundColor: '#222',

  // physics settings
  physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: false
    }
  }
};