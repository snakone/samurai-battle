import Fighter from "../classes/figther";

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
  window.addEventListener('keydown', (ev: KeyboardEvent) => manageKeyDown(ev.key, f[0], f [1]));
  window.addEventListener('keyup', (ev: KeyboardEvent) => manageKeyUp(ev.key));
}

function manageKeyDown(
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
    case ' ': f.attack();
     break;
    case 'Enter': e.attack();
     break;
  }
}

function manageKeyUp(
  key: string
): void {
  switch (key) {
    case 'd': case 'a': case 'w': 
    case 'ArrowLeft': case 'ArrowRight': case 'ArrowUp':
      keys[key] = false;
      break;
  }
}