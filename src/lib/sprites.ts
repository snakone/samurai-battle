import { Sprites } from "src/classes/interfaces.js";
import Sprite from "../classes/sprite.js";

export const sprites: Sprite[] = [
  new Sprite(
    {x: 0, y: 0}, 
    '../assets/images/background.png'
  ),
  new Sprite(
    {x: 655, y: 160}, 
    '../assets/images/shop.png', 2.5, 6
  )
];

const path = '../assets/images/samurai/';

export const Sakurai: Sprites = 
  {
    idle: {
      frames: 8,
      src: path + 'Idle.png',
      image: createImage(path + 'Idle.png')
    },
    run: {
      frames: 8,
      src: path + 'Run.png',
      image: createImage(path + 'Run.png')
    },
    jump: {
      frames: 2,
      src: path + 'Jump.png',
      image: createImage(path + 'Jump.png')
    },
    fall: {
      frames: 2,
      src: path + 'Fall.png',
      image: createImage(path + 'Fall.png')
    }
  }
;

function createImage(path: string): HTMLImageElement {
  const img = new Image();
  img.src = path;
  return img;
}
