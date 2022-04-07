import { socket } from "../index.js";
import Fighter from "../classes/figther.js";

export const keys: any = {
  a: false,  // Player 1 Left
  d: false,  // Player 1 Right
  w: false,  // Player 1 Jump
  s: false,
  ArrowLeft: false,  // Player 2 Left
  ArrowRight: false,  // Player 2 Right
  ArrowUp: false,  // Player 2 Jump
  ArrowDown: false,
  space: false,  // Player 1 Attack,
  Enter: false  // Player 2 Attack
};

export function listen(f: Fighter[]): void {
  window.addEventListener('keydown', (ev: KeyboardEvent) => socket.emit('keyDown', ev.key));
  window.addEventListener('keyup', (ev: KeyboardEvent) => socket.emit('keyUp', ev.key));
  socket.listen('onKeyDown', (key: string) => socketKeyDown(key, f[0], f [1]));
  socket.listen('onKeyUp', (key: string) => socketKeyUp(key));
}

function socketKeyDown(
  key: string,
  f: Fighter,
  e: Fighter
): void {
  switch (key) {
    case 'd': case 'a': case 'w': 
      keys[key] = true;
      f.lastKey = key;
      break;
    case 'ArrowLeft': case 'ArrowRight': case 'ArrowUp':
      keys[key] = true;
      e.lastKey = key;
      break;
    case ' ': if (!e.dead) f.attack();
     break;
    case 'Enter': if (!f.dead) e.attack();
     break;
  }
}

function socketKeyUp(
  key: string
): void {
  switch (key) {
    case 'd': case 'a': case 'w': 
    case 'ArrowLeft': case 'ArrowRight': case 'ArrowUp':
      keys[key] = false;
      break;
  }
}