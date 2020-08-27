export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [],
  backgroundColor: '#222',

  // physics settings
  physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
    }
  }
};