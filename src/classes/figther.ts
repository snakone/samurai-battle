import { checkGravity, checkMov } from "../utils/player.js";
import { attackAudio, attackAudio1 } from "../lib/sounds.js";
import { context } from "./canvas.js";
import { Coords, AttackBox, Stats } from "./interfaces.js";
import Sprite from "./sprite.js";
import { interval } from "../listeners/timer.js";

export const width = 50;
export const height = 120;
const rate = .02;  // Each 50 DEF - 1 ATK
const inc = 1.5; // Back DMG

class Fighter extends Sprite {
  lastKey!: string;
  vel: Coords = {x: 0, y: 0};  // Velocity
  attacking = false;
  w = width;
  h = height;
  dead = false;

  constructor(
    public pos: Coords,  // Position
    public enemy: boolean,  // Is Enemy?
    public box: AttackBox,  // Hit Box
    public stats: Stats,  // Player Stats
    public src?: string,  // Sprite Source
    public scale = 1,
    public frames = 1,
    public offset: Coords = {x: 0, y: 0},
    public sprites?: any,  // Sprite List,
    public back = false // Opposite direction
  ) {
    super(pos, src, scale, frames, offset);
    this.createBox();
    this.fixEnemy();
    this.writeNames();
    this.stats.max = this.stats.hp;
  }

  public update(): void {
    this.move();
    this.updateSprite(this.dead);
    checkGravity(this);
    checkMov(this);
  }

  public move(): void {
    if (context) {
      this.pos.y += this.vel.y;
      this.pos.x += this.vel.x * this.stats.vel;  // Apply player Velocity

      this.vel.y !== 0 && this.box.special ?  // Special Moves on AIR
        (this.box.h = this.box.special.h,
         this.box.pos!.y -= this.box.special.h - this.box.default.h
        ) : this.box.h = this.box.default.h;

      this.back ?  // Fix Hit Box when switching sides
        this.box.pos!.x = this.pos.x - this.offset.x + 
          this.box.offset.back! - (width / 2) :
        this.box.pos!.x = this.pos.x + this.box.offset.x;

      // context.fillStyle = 'yellow';
      // context.fillRect(this.box.pos!.x, this.box.pos!.y, this.box.w, this.box.h);

      this.box.pos!.y = this.pos.y + this.box.offset.y;
    }
  }

  public attack(): void {
    if (
      this.dead || 
      this.attacking || 
      interval == 0
    ) { return; }
    this.attacking = true;
    this.vel.y == 0 ?  // Different Attack & Sound while jumping
    (this.switchSprite('attack1', this.back), attackAudio.play()) : 
    (this.switchSprite('attack2', this.back), attackAudio1.play());
  }

  public switchSprite(
    sprite: string,
    reverse = false
  ): void {
    this.back = reverse;

    if (this.img === this.sprites.death.image ||
        this.img === this.sprites.death.reverse) {  
      if (this.current === this.sprites.death.frames - 1)
        this.dead = true;
        this.vel.x = 0;
        this.vel.y = 0;
        return;
     }
    if ((this.img === this.sprites.attack1.image ||
        this.img === this.sprites.attack1.reverse
    ) && this.current < this.sprites.attack1.frames - 1) { return; }

    if ((this.img === this.sprites.attack2.image ||
        this.img === this.sprites.attack2.reverse
    ) && this.current < this.sprites.attack2.frames - 1) { return; }

    if ((this.img === this.sprites.hit.image ||
        this.img === this.sprites.hit.reverse
    ) && this.current < this.sprites.hit.frames - 1) { return; }
      
    if (!this.back) { // Front
      if (this.img !== this.sprites[sprite].image) {
        this.img = this.sprites?.[sprite].image;
        this.frames = this.sprites?.[sprite].frames;
        this.current = 0;
      }
    } else { // Back
      if (this.img !== this.sprites[sprite].reverse) {
        this.img = this.sprites?.[sprite].reverse;
        this.frames = this.sprites?.[sprite].frames;
        this.current = 0;
      }
    }
  }

  public takeHit(e: Fighter): void {
    this.attacking = false;
    if (e.dead) { return; }
    e.stats.hp -= (  // Att Formula
      e.enemy && !e.back ? (this.stats.att * inc) :  // Back DMG
      e.back && !e.enemy ? (this.stats.att * inc) : this.stats.att - // + DMG if Back
      (e.stats.def * rate) // DEF
    );
    e.stats.hp <= 0 ? e.switchSprite('death', e.back) : 
    e.switchSprite('hit', e.back);
  }

  private createBox(): void {  // Hit Box
    this.box = {
      pos: {x: this.pos.x, y: this.pos.y},
      w: this.box.w,
      h: this.box.h,
      offset: this.box.offset,
      default: {w: this.box.w, h: this.box.h},
      special: this.box.special
    };
  }

  private fixEnemy(): void {  // Fix Enemy Starting backwards
    if (this.enemy) this.switchSprite('idle', true);
  }

  private writeNames(): void {
    document.querySelector(
      this.enemy ? '.enemy-name' : '.fighter-name'
    )!.textContent = this.stats.name;
  }
}

export default Fighter;