import { interval } from "../listeners/timer.js";
import { canvas } from "../classes/canvas.js";
import Fighter, { width, height } from "../classes/figther.js";
import { keys } from "../listeners/keyboard.js";
import { players } from "../lib/players.js";
import { sprites } from "../lib/sprites.js";

const gravity = .7;
const movX = 5;
const movY = 15;
const rate = .02;  // Each 50 DEF - 1 ATK
const ground = 97;
const high = 330;
let padding = 25;  // Padding Attacks

export function checkGravity(f: Fighter): void {
  f.pos.y + height + f.vel.y >= canvas.height - ground ? 
  (f.vel.y = 0, f.pos.y = high) : f.vel.y += gravity
}

export function checkMov(f: Fighter): void {
  f.vel.x = 0;
  f.back ? padding = -25 : 25;
  // Keys
  if (!f.enemy) {
    if (keys.a && f.lastKey !== 'd') {
      f.vel.x = -movX;
      f.switchSprite('run', true);
      
    } else if (keys.d && f.lastKey !== 'a') {
      f.vel.x = movX;
      f.switchSprite('run');
    } else if (f.lastKey === 'a') {
      f.switchSprite('idle', true);
    } else {
      f.switchSprite('idle', f.back);
    }
    if (keys.w && f.lastKey === 'w' && f.vel.y === 0) f.vel.y = -movY;
    if (f.vel.y < 0) f.switchSprite('jump', f.back)
    if (f.vel.y > 0) f.switchSprite('fall', f.back);
  } else { // Enemy
    if (keys.ArrowLeft && f.lastKey !== 'ArrowRight') {
      f.vel.x = -movX;
      f.switchSprite('run', true);
    }
    else if (keys.ArrowRight && f.lastKey !== 'ArrowLeft') {
      f.vel.x = movX;
      f.switchSprite('run');
    } else if (f.lastKey === 'ArrowLeft') {
      f.switchSprite('idle', true);
    } else {
      f.switchSprite('idle', f.back);
    }
    if (keys.ArrowUp && f.lastKey === 'ArrowUp' && f.vel.y === 0) f.vel.y = -movY;
    if (f.vel.y < 0) f.switchSprite('jump', f.back)
    if (f.vel.y > 0) f.switchSprite('fall', f.back);
  }

  // Edges
  if (f.pos.x <= 0) { f.pos.x = 0 }
  if (f.pos.x + width >= canvas.width) { f.pos.x = canvas.width - width }
}

export function collision(v: Fighter[]): void {
  const f = v[0];
  const e = v[1];
  
  if (
    f.box.pos!.x + f.box.w >= e.pos.x &&
    f.box.pos!.x <= e.pos.x + e.w - padding &&
    f.box.pos!.y + f.box.h >= e.pos.y &&
    f.box.pos!.y <= e.pos.y + e.h  &&
    f.attacking && f.current === 4
  ) {
    e.switchSprite('hit', e.back);
    f.attacking = false;
    if (e.stats.hp <= 0) { return; }
    e.stats.hp -= (f.stats.att - (e.stats.def * rate));
    if (e.stats.hp <= 0) e.stats.hp = 0;
    if (e.stats.hp >= e.max) e.stats.hp = e.max;
    document.getElementById('enemy-bar')!.style.width = e.stats.hp + '%'
  }

  if (
    e.box.pos!.x + e.box.w >= f.pos.x &&
    e.box.pos!.x <= f.pos.x + f.w - padding &&
    e.box.pos!.y + e.box.h >= f.pos.y &&
    e.box.pos!.y <= f.pos.y + f.h &&
    e.attacking && e.current === 2
  ) {
    f.switchSprite('hit', f.back);
    e.attacking = false;
    if (f.stats.hp <= 0) { return; }
    f.stats.hp -= (e.stats.att - (f.stats.def * rate));
    if (f.stats.hp <= 0) f.stats.hp = 0;
    if (f.stats.hp >= f.max) f.stats.hp = f.max;
    document.getElementById('fighter-bar')!.style.width = 100 - f.stats.hp + '%'
  }

  if (f.attacking && f.current === 4) f.attacking = false;
  if (e.attacking && e.current === 2) e.attacking = false;
  if (f.stats.hp <= 0 || e.stats.hp <= 0) showMessage();
}

export function showMessage(timer = false): void {
  window.clearInterval(interval);
  const el = document.getElementById('message');
  setTimeout(() => {
    el!.style.display = 'flex';
    if (players[0].stats.hp > players[1].stats.hp) {
      el!.children![0].textContent = players[0].stats.name + ' Wins!';
      players[1].die();
    } else if (players[0].stats.hp === players[1].stats.hp) {
      el!.children![0].textContent = 'It\'s a Tie!';
    } else {
      el!.children![0].textContent = players[1].stats.name + ' Wins!';
      players[0].die();
    }
  }, timer ? 4000 : 500);
}

export function checkSprites(): void {
  sprites.forEach(s => s.updateSprite());
}