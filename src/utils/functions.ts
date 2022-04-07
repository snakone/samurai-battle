import { clear, interval, timer } from "../listeners/timer.js";
import { canvas, context } from "../classes/canvas.js";
import { listen } from "../listeners/keyboard.js";
import { players } from "../lib/players.js";
import { sprites } from "../lib/sprites.js";
import { collision } from "./player.js";

const load = 530;
export let frame = true;

export function start(): void {
  if (players.length > 0) {
    loader(load);
    animate();
    listen(players);
    timer();
  }
}

function animate(): void {
  if (!frame) return
  window.requestAnimationFrame(animate);
  checkSprites();
  fill(context);
  players.forEach(p => p.update());
  collision(players);
}

export function fill(
  c: CanvasRenderingContext2D | null
): void {
  if (c) {
    c.fillStyle = 'rgba(255,255,255, .1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
  };
}

function checkSprites(): void {
  sprites.forEach(s => s.updateSprite());
}

export function showMessage(timer = false): void {
  window.clearInterval(interval);
  const el = document.getElementById('message');
  let c = el!.children[0];  // Span Element
  const p = players[0].stats;
  const e = players[1].stats;

  setTimeout(() => {
    el!.style.display = 'flex';
    if (p.hp / p.max! > e.hp / e.max!) c.textContent = p.name + ' Wins!';
    else if (p.hp / p.max! === e.hp / e.max!) c.textContent = 'It\'s a Draw!';
    else c.textContent = e.name + ' Wins!';
  }, timer ? 4000 : 500);
}

function loader(time: number): void {
  setTimeout(() => {
    const el = document.getElementsByClassName('wrapper')[0];
    (el as HTMLElement).style.display = 'block';
  }, time);
}