import Fighter from './classes/figther.js';
import { context, canvas, background } from "./classes/canvas.js";
import { listen } from './listeners/keyboard.js';
import { checkSide, collision } from './utils/functions.js';

const players: Fighter[] = [
  new Fighter({x: 0, y: 0}, false, 'green', {w: 100, h: 50, offset: {x: 0, y: 0}}),
  new Fighter({x: 400, y: 0}, true, 'red', {w: 100, h: 50, offset: {x: -50, y: 0}})
];

function animate(): void {
  window.requestAnimationFrame(animate);
  fill(context);
  players.forEach(p => p.update())
  collision(players);
  checkSide(players)
}

function fill(
  c: CanvasRenderingContext2D | null
): void {
  if (c) {
    c.fillStyle = background;
    c.fillRect(0, 0, canvas.width, canvas.height);
  }
}

animate();
listen(players);

document.querySelector('button')?.addEventListener('click', ev => {
  console.log(players)
})





