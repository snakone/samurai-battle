import { showMessage } from "../utils/functions.js";

const seconds = 1000;
let time = 60;
export let interval!: number;

export function timer(): void {
  const count = document.getElementById('counter');
  const el = document.getElementById('message');
  interval = setInterval(() => {
    time--;
    count!.textContent = time.toString();
    if (time <= 0) {
      window.clearInterval(interval);
      el!.style.display = 'flex';
      el!.children![0].textContent = 'Time Over!';
      setTimeout(() => el!.style.display = 'none', seconds * 3);
      showMessage(true);
    };
  }, seconds);
}

