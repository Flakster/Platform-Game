import PlayGame from '../Scenes/PlayGame';

const scene = new PlayGame();
it ('returns true when player touches a fly whitout press the down arrow key',() =>{
  let pos = 150;
  let arrowKeyPressed = false;
  expect(scene.touchFly(pos,arrowKeyPressed)).toBe(true)
})

it('returns true when player touches a fly and its position is higher(less) than 160',() =>{
  let pos = 130;
  let arrowKeyPressed = true;
  expect(scene.touchFly(pos,arrowKeyPressed)).toBe(true) 
})

it('returns false when player touches a fly and the down arrow key is pressed',() =>{
  let pos = 150;
  let arrowKeyPressed = true;
  expect(scene.touchFly(pos,arrowKeyPressed)).toBe(true) 
})

it('returns true when player touches a slime and its position is lower(more) than 160',() =>{
  let pos = 161;
  expect(scene.touchSlime(pos)).toBe(true) 
})

it('returns false when player touches a slime and its position is higher(less) than 160',() =>{
  let pos = 155;
  expect(scene.touchSlime(pos)).toBe(false) 
})

