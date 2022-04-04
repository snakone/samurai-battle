import { attackAudio, attackAudio1 } from "../lib/sounds.js";
import { checkGravity, checkMov } from "../utils/functions.js";
import { context } from "./canvas.js";
import { Coords, AttackBox, Stats } from "./interfaces.js";
import Sprite from "./sprite.js";

export const width = 50;
export const height = 150;
const tick = 100;

class Fighter extends Sprite {
  lastKey!: string;
  vel: Coords = {x: 0, y: 0};
  attacking = false;
  w = width;
  h = height;
  max = 0;

  constructor(
    public pos: Coords,
    public enemy: boolean,
    public box: AttackBox,
    public stats: Stats,
    public src?: string,
    public scale = 1,
    public frames = 1,
    public offset: Coords = {x: 0, y: 0},
    public sprites?: any,
    public back = false
  ) {
    super(pos, src, scale, frames, offset);

    this.box = {
      pos: {x: this.pos.x, y: this.pos.y},
      w: box.w,
      h: box.h,
      offset: box.offset,
      front: box.front,
      back: box.back
    };

    this.max = this.stats.hp;
    document.querySelector(
      enemy ? '.enemy-name' : '.fighter-name'
    )!.textContent = this.stats.name;
  }

  public update(): void {
    if (this.stats.hp > 0) {
      this.move();
      this.updateSprite();
      checkGravity(this);
      checkMov(this);
    }
  }

  public move(): void {
    if (context) {
      this.pos.y += this.vel.y;
      this.pos.x += this.vel.x;
      this.box.pos!.x = this.pos.x;
      this.box.pos!.y = this.pos.y;

      context.fillStyle = 'yellow';
      context.fillRect(this.box.pos!.x, this.box.pos!.y, this.box.w, this.box.h);
 
    }
  }

  public attack(): void {
    if (this.stats.hp > 0) {
      this.switchSprite('attack1', this.back);
      this.attacking = true;
      this.vel.y == 0 ? attackAudio.play() : attackAudio1.play();
    }
  }

  public switchSprite(
    sprite: string,
    reverse = false
  ): void {
    this.back = reverse;
    if ((
        this.img === this.sprites.attack1.image ||
        this.img === this.sprites.attack1.reverse
      ) &&
       this.current < this.sprites.attack1.frames - 1) { return; }

    if ((
        this.img === this.sprites.hit.image ||
        this.img === this.sprites.hit.reverse
      ) &&
       this.current < this.sprites.hit.frames - 1) { return; }

    if (!this.back) {
      if (this.img !== this.sprites[sprite].image) {
        this.img = this.sprites?.[sprite].image;
        this.frames = this.sprites?.[sprite].frames || 0;
        this.current = 0;
      }
    } else {
      if (this.img !== this.sprites[sprite].reverse) {
        this.img = this.sprites?.[sprite].reverse;
        this.frames = this.sprites?.[sprite].frames || 0;
        this.current = 0;
      }
    }
  }

  public die(): void {
    this.h = 0;
    this.w = 0;
    this.stats.hp = 0;
  }
}

export default Fighter;