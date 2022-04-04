import { context, canvas, background } from "./classes/canvas.js";
import { listen } from './listeners/keyboard.js';
import { checkSprites, collision } from './utils/functions.js';
import { players } from './lib/players.js';
import { timer } from "./listeners/timer.js";

function animate(): void {
  window.requestAnimationFrame(animate);
  fill(context);
  checkSprites();
  players.forEach(p => p.update());
  collision(players);
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
timer();

document.querySelector('button')?.addEventListener('click', ev => {
  players.forEach((p, i) => console.log({pos: p.pos, box: p.box}))
});





