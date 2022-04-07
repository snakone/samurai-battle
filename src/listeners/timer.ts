import { showMessage } from "../utils/functions.js";

const seconds = 1000;
let time = 60;  // Game Time
export let interval!: number;

export function timer(): void {
  const count = document.getElementById('counter');
  const el = document.getElementById('message');
  interval = setInterval(() => {
    time--;
    count!.textContent = time.toString();
    if (time <= 0) {
      clear();
      stopAnimation();
      show(el);
    };
  }, seconds);
}

export function clear(): void {
  window.clearInterval(interval);
  interval = 0;
}

function stopAnimation(): void {
  window.removeEventListener('keydown', (ev: KeyboardEvent) => {});
}

function show(el: HTMLElement | null): void {
  el!.style.display = 'flex';
  el!.children![0].textContent = 'Time Over!';
  setTimeout(() => el!.style.display = 'none', seconds * 3);
  showMessage(true);
}

