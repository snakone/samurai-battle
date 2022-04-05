import { interval } from "../listeners/timer.js";
import { canvas } from "../classes/canvas.js";
import Fighter, { width, height } from "../classes/figther.js";
import { keys } from "../listeners/keyboard.js";
import { players } from "../lib/players.js";
import { sprites } from "../lib/sprites.js";

const gravity = .7;
const movX = 5;
const movY = 15;

const ground = 97;  // Distance from Bottom
const high = 330;  // Distance from Top
let padding = 25;  // Padding Attacks

export function checkGravity(f: Fighter): void {
  f.pos.y + height + f.vel.y >= canvas.height - ground ? 
  (f.vel.y = 0, f.pos.y = high) : f.vel.y += gravity
}

export function checkMov(f: Fighter): void {
  if (f.dead) { return; }
  f.vel.x = 0;
  f.back ? padding = -25 : 25;
  !f.enemy ? fighterMove(f) : enemyMove(f);
  // Edges
  if (f.pos.x <= 0) f.pos.x = 0; // Left
  if (f.pos.x + width >= canvas.width) f.pos.x = canvas.width - width; // Right
}

export function collision(v: Fighter[]): void {
  const f = v[0];  // Player 1
  const e = v[1];  // Player 2
  
  // Fighter vs Enemy
  if (
    f.box.pos!.x + f.box.w >= e.pos.x &&
    f.box.pos!.x <= e.pos.x + e.w - padding &&
    f.box.pos!.y + f.box.h >= e.pos.y &&
    f.box.pos!.y <= e.pos.y + e.h  &&
    f.attacking && f.current === (f.back ? 2 : 3)
  ) {
    f.takeHit(e);
    document.getElementById('enemy-bar')!.style.width = e.stats.hp + '%'
  }

  // Enemy vs Fighter
  if (
    e.box.pos!.x + e.box.w >= f.pos.x &&
    e.box.pos!.x <= f.pos.x + f.w - padding &&
    e.box.pos!.y + e.box.h >= f.pos.y &&
    e.box.pos!.y <= f.pos.y + f.h &&
    e.attacking && e.current === 2
  ) {
    e.takeHit(f);
    document.getElementById('fighter-bar')!.style.width = 100 - f.stats.hp + '%'
  }

  // End Attack before animation ends
  if (f.attacking && f.current === (f.back ? 2 : 3)) f.attacking = false;
  if (e.attacking && e.current === 2) e.attacking = false;
  if (f.stats.hp <= 0 || e.stats.hp <= 0) showMessage();
}

export function showMessage(timer = false): void {
  window.clearInterval(interval);
  const el = document.getElementById('message');
  let c = el!.children[0];  // Span Element
  const p = players[0].stats;
  const e = players[1].stats;

  setTimeout(() => {
    el!.style.display = 'flex';
    if (p.hp / p.max > e.hp / e.max) c.textContent = p.name + ' Wins!';
    else if (p.hp / p.max === e.hp / e.max) c.textContent = 'It\'s a Tie!';
    else c.textContent = e.name + ' Wins!';
  }, timer ? 4000 : 500);
}

export function checkSprites(): void {
  sprites.forEach(s => s.updateSprite());
}

function fighterMove(f: Fighter): void {
  if (keys.a && f.lastKey !== 'd') f.vel.x = -movX, f.switchSprite('run', true);  // Left
  else if (keys.d && f.lastKey !== 'a') f.vel.x = movX, f.switchSprite('run');  // Right
  else f.switchSprite('idle', f.back);  // Idle AFK
  if (keys.w && f.lastKey === 'w' && f.vel.y === 0) f.vel.y = -movY;  // Jump
  if (f.vel.y < 0) f.switchSprite('jump', f.back);
  if (f.vel.y > 0) f.switchSprite('fall', f.back);  // Falling
}

function enemyMove(f: Fighter): void {
  if (keys.ArrowLeft && f.lastKey !== 'ArrowRight') f.vel.x = -movX, f.switchSprite('run', true);  // Left
  else if (keys.ArrowRight && f.lastKey !== 'ArrowLeft') f.vel.x = movX, f.switchSprite('run');  // Right
  else f.switchSprite('idle', f.back);  // Idle AFK
  if (keys.ArrowUp && f.lastKey === 'ArrowUp' && f.vel.y === 0) f.vel.y = -movY;  // Jump
  if (f.vel.y < 0) f.switchSprite('jump', f.back)
  if (f.vel.y > 0) f.switchSprite('fall', f.back);  // Falling
}