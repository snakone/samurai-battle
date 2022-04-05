const canvas: HTMLCanvasElement = document.querySelector('#game') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const width = 1024;
const height = 576;
canvas.width = width;
canvas.height = height;

context?.fillRect(0, 0, width, height);

export { canvas, context }