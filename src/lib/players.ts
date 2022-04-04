import { canvas } from "../classes/canvas.js";
import Fighter from "../classes/figther.js";
import { Sakurai, Tatsuki } from "./sprites.js";

export const players: Fighter[] = [
  new Fighter(
    {x: 185, y: 0}, // Position
    false, // Enemy?
    {w: 175, h: 75, offset: {x: 0, y: 0}, front: 0, back: 0}, // Attack Box
    {name: 'Sakurai', att: 10, hp: 100, def: 100}, // Stats
    '../assets/images/samurai/Idle.png', // Image
    2.3, // Scale
    8, // Frames
    {x: 0, y: 132}, // Offset
    Sakurai, // Sprites
    false // Back
  ),
  new Fighter(
    {x: canvas.width - 110, y: 0}, 
    true,
    {w: 150, h: 85, offset: {x: 0, y: 0}, front: 0, back: 0}, 
    {name: 'Tatsuki', att: 12, hp: 90, def: 50},
    '../assets/images/kenji/Idle_reverse.png',
    2.3, 
    8,
    {x: 0, y: 145},
    Tatsuki,
    false
  )
];