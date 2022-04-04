import { attackAudio, attackAudio1 } from "../lib/sounds.js";
import { checkGravity, checkMov } from "../utils/functions.js";
import { context } from "./canvas.js";
import { Coords, AttackBox, Stats } from "./interfaces.js";

export const width = 50;
export const height = 150;
const tick = 100;

class Fighter {
  lastKey!: string;
  vel: Coords = {x: 0, y: 0};
  attacking = false;

  constructor(
    public pos: Coords,
    public enemy: boolean,
    public color: string,
    public box: AttackBox,
    public stats: Stats,
    public w = width,
    public h = height,
    public max = 0
  ) { 
    this.box = {
      pos: { 
        x: this.pos.x,
        y: this.pos.y
      },
      w: box.w,
      h: box.h,
      offset: {
        x: box.offset.x,
        y: box.offset.y
      }
    };

    this.max = this.stats.hp;
    document.querySelector(
      enemy ? '.enemy-name' : '.fighter-name'
    )!.textContent = this.stats.name;
  }

  public update(): void {
    if (this.stats.hp > 0) {
      this.draw();
      checkGravity(this);
      checkMov(this);
    }
  }

  public draw(): void {
    if (context) {
      context.fillStyle = this.color;
      context.fillRect(this.pos.x, this.pos.y, this.w, this.h);

      if (this.attacking) {
        context.fillStyle = 'yellow';
        context.fillRect(this.box.pos!.x, this.box.pos!.y, this.box.w, this.box.h);
      }

      this.pos.y += this.vel.y;
      this.pos.x += this.vel.x;
      this.box.pos!.y = this.pos.y;
      this.box.pos!.x = this.pos.x + this.box.offset.x;
    }
  }

  public attack(): void {
    if (this.stats.hp > 0) {
      this.attacking = true;
      this.vel.y == 0 ? attackAudio.play() : attackAudio1.play();
      setTimeout(() => this.attacking = false, tick);
    }
  }

  public die(): void {
    this.h = 0;
    this.w = 0;
    this.stats.hp = 0;
  }
}

export default Fighter;