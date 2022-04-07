import { canvas } from "../classes/canvas.js";
import Fighter from "../classes/figther.js"
import { SakuraiSprites, TatsukiSprites, ValdimorSprites } from "./sprites.js"

export const Sakurai = new Fighter(
  {x: 110, y: 50}, // Position
  false, // Enemy?
  { // Attack Box
    w: 140, h: 50, 
    offset: {x: 80, y: 50, back: 75}, 
    default: {w: 140, h: 50}
  },
  { // Stats
    name: 'Sakurai', 
    att: 10, 
    hp: 200, 
    def: 70, 
    vel: 1
  },
  '../assets/images/samurai/Idle.png', // Image
  2.5, // Scale
  8, // Frames
  {x: 230, y: 157}, // Offset
  SakuraiSprites // Sprites
);

export const Tatsuki = new Fighter(
  {x: canvas.width - 160, y: 0}, 
  true,
  {
    w: 150, h: 50, 
    offset: {x: 80, y: 50, back: 80}, 
    default: {w: 140, h: 50}
  }, 
  {
    name: 'Tatsuki', 
    att: 7, 
    hp: 190, 
    def: 50, 
    vel: .8
  },
  '../assets/images/kenji/Idle_reverse.png',
  2.5, 
  8,
  {x: 225, y: 167},
  TatsukiSprites,
  true
);

export const Valdimor = new Fighter(
  {x: canvas.width - 160, y: 0}, 
  true,
  {
    w: 220, h: 50, 
    offset: {x: -105, y: 50, back: 145}, 
    default: {w: 140, h: 50},
    special: {w: 0, h: 150}
  }, 
  {
    name: 'Valdimor', 
    att: 12, 
    hp: 230, 
    def: 10, 
    vel: .7
  },
  '../assets/images/warrior/Idle.png',
  2.8, 
  8,
  {x: 210, y: 132},
  ValdimorSprites
)