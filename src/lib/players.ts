import { canvas } from "../classes/canvas.js";
import Fighter from "../classes/figther.js";
import { Sakurai, Tatsuki } from "./sprites.js";

export const players: Fighter[] = [
  new Fighter(
    {x: 110, y: 0}, // Position
    false, // Enemy?
    {w: 140, h: 50, offset: {x: 80, y: 50}}, // Attack Box
    {name: 'Sakurai', att: 10, hp: 100, def: 100, vel: 1}, // Stats
    '../assets/images/samurai/Idle.png', // Image
    2.5, // Scale
    8, // Frames
    {x: 230, y: 157}, // Offset
    Sakurai // Sprites
  ),
  new Fighter(
    {x: canvas.width - 160, y: 0}, 
    true,
    {w: 150, h: 50, offset: {x: 80, y: 50}}, 
    {name: 'Tatsuki', att: 12, hp: 90, def: 50, vel: .8},
    '../assets/images/kenji/Idle_reverse.png',
    2.5, 
    8,
    {x: 225, y: 167},
    Tatsuki
  )
];