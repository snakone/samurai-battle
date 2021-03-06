import { Sprites } from "../classes/interfaces.js";
import Sprite from "../classes/sprite.js";

export const sprites: Sprite[] = [
  new Sprite(
    {x: 0, y: 0}, 
    '../assets/images/background.png'
  ),
  new Sprite(
    {x: 645, y: 160}, 
    '../assets/images/shop.png',
    2.5, // Scale
    6 // Frames
  )
];

const path1 = '../assets/images/samurai/';
const path2 = '../assets/images/kenji/';
const path3 = '../assets/images/warrior/';

export const SakuraiSprites: Sprites = 
  {
    idle: {
      frames: 8,
      image: createImage(path1 + 'Idle.png'),
      reverse: createImage(path1 + 'Idle_reverse.png')
    },
    run: {
      frames: 8,
      image: createImage(path1 + 'Run.png'),
      reverse: createImage(path1 + 'Run_reverse.png')
    },
    jump: {
      frames: 2,
      image: createImage(path1 + 'Jump.png'),
      reverse: createImage(path1 + 'Jump_reverse.png')
    },
    fall: {
      frames: 2,
      image: createImage(path1 + 'Fall.png'),
      reverse: createImage(path1 + 'Fall_reverse.png')
    },
    attack1: {
      frames: 6,
      image: createImage(path1 + 'Attack1.png'),
      reverse: createImage(path1 + 'Attack1_reverse.png')
    },
    attack2: {
      frames: 6,
      image: createImage(path1 + 'Attack2.png'),
      reverse: createImage(path1 + 'Attack2_reverse.png')
    },
    hit: {
      frames: 4,
      image: createImage(path1 + 'TakeHit.png'),
      reverse: createImage(path1 + 'TakeHit_reverse.png')
    },
    death: {
      frames: 6,
      image: createImage(path1 + 'Death.png'),
      reverse: createImage(path1 + 'Death_reverse.png')
    }
};

export const TatsukiSprites: Sprites = 
  {
    idle: {
      frames: 4,
      image: createImage(path2 + 'Idle_reverse.png'),
      reverse: createImage(path2 + 'Idle.png')
    },
    run: {
      frames: 8,
      image: createImage(path2 + 'Run_reverse.png'),
      reverse: createImage(path2 + 'Run.png')
    },
    jump: {
      frames: 2,
      image: createImage(path2 + 'Jump_reverse.png'),
      reverse: createImage(path2 + 'Jump.png')
    },
    fall: {
      frames: 2,
      image: createImage(path2 + 'Fall_reverse.png'),
      reverse: createImage(path2 + 'Fall.png')
    },
    attack1: {
      frames: 4,
      image: createImage(path2 + 'Attack1_reverse.png'),
      reverse: createImage(path2 + 'Attack1.png')
    },
    attack2: {
      frames: 4,
      image: createImage(path2 + 'Attack2_reverse.png'),
      reverse: createImage(path2 + 'Attack2.png')
    },
    hit: {
      frames: 4,
      image: createImage(path2 + 'TakeHit_reverse.png'),
      reverse: createImage(path2 + 'TakeHit.png')
    },
    death: {
      frames: 7,
      image: createImage(path2 + 'Death_reverse.png'),
      reverse: createImage(path2 + 'Death.png')
    }
};

export const ValdimorSprites: Sprites = 
  {
    idle: {
      frames: 10,
      image: createImage(path3 + 'Idle.png'),
      reverse: createImage(path3 + 'Idle_reverse.png')
    },
    run: {
      frames: 8,
      image: createImage(path3 + 'Run.png'),
      reverse: createImage(path3 + 'Run_reverse.png')
    },
    jump: {
      frames: 3,
      image: createImage(path3 + 'Jump.png'),
      reverse: createImage(path3 + 'Jump_reverse.png')
    },
    fall: {
      frames: 3,
      image: createImage(path3 + 'Fall.png'),
      reverse: createImage(path3 + 'Fall_reverse.png')
    },
    attack1: {
      frames: 7,
      image: createImage(path3 + 'Attack2.png'),
      reverse: createImage(path3 + 'Attack2_reverse.png')
    },
    attack2: {
      frames: 8,
      image: createImage(path3 + 'Attack3.png'),
      reverse: createImage(path3 + 'Attack3_reverse.png')
    },
    hit: {
      frames: 4,
      image: createImage(path3 + 'TakeHit.png'),
      reverse: createImage(path3 + 'TakeHit_reverse.png')
    },
    death: {
      frames: 7,
      image: createImage(path3 + 'Death.png'),
      reverse: createImage(path3 + 'Death_reverse.png')
    }
};

function createImage(path: string): HTMLImageElement {
  const img = new Image();
  img.src = path;
  return img;
}
