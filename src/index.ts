import { context, canvas, background } from "./classes/canvas.js";
import { listen } from './listeners/keyboard.js';
import { checkSide, collision } from './utils/functions.js';
import { players } from './lib/players.js';
import { timer } from "./listeners/timer.js";

function animate(): void {
  window.requestAnimationFrame(animate);
  fill(context);
  players.forEach(p => p.update());
  collision(players);
  checkSide(players);
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
  console.log(players)
})





