import { canvas } from "../classes/canvas.js";
import Fighter from "../classes/figther.js";
import { Sakurai } from "./sprites.js";

export const players: Fighter[] = [
  new Fighter(
    {x: 100, y: 0}, 
    false, 
    'green', 
    {w: 100, h: 50, offset: {x: 0, y: 0}},
    {name: 'Sakurai', att: 10, hp: 100, def: 100},
    '../assets/images/samurai/Idle.png',
    2.3, 
    8,
    {x: 225, y: 132},
    Sakurai
  ),
  new Fighter(
    {x: canvas.width - 150, y: 0}, 
    true, 
    'red', 
    {w: 100, h: 50, offset: {x: -50, y: 0}}, 
    {name: 'Tatsuki', att: 11, hp: 100, def: 50}
  )
];