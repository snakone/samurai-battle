import { canvas } from "../classes/canvas.js";
import Fighter from "../classes/figther.js";

export const players: Fighter[] = [
  new Fighter(
    {x: 100, y: 0}, 
    false, 
    'green', 
    {w: 100, h: 50, offset: {x: 0, y: 0}},
    {name: 'Sakurai', att: 10, hp: 100, def: 100}
  ),
  new Fighter(
    {x: canvas.width - 150, y: 0}, 
    true, 
    'red', 
    {w: 100, h: 50, offset: {x: -50, y: 0}}, 
    {name: 'Tatsuki', att: 11, hp: 100, def: 50}
  )
];