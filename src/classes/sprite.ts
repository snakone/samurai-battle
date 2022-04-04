import { context } from "./canvas.js";
import { Coords } from "./interfaces.js";

const hold = 6;

class Sprite {
  img!: HTMLImageElement | undefined;

  constructor(
    public pos: Coords,
    public src?: string | undefined,
    public scale = 1,
    public frames = 1,
    public offset: Coords = {x: 0, y: 0},
    public current = 0,
    public elapsed = 0
  ) { 
    this.img = new Image();
    if (src) this.img.src = src;
  }

  public updateSprite(): void {
    this.draw();
    this.animate();
  }

  public draw(): void {
    if (this.img && this.frames) {
      context?.drawImage(
        this.img,
        this.current * (this.img.width / this.frames), 
        0, 
        this.img.width / this.frames, 
        this.img.height,
        this.pos.x - this.offset.x, 
        this.pos.y - this.offset.y, 
        (this.img.width / this.frames) * this.scale, 
        this.img.height * this.scale
      );
    }
  }

  public animate(): void {
    this.elapsed++;

    if (this.elapsed % hold === 0) {
      if (this.current < this.frames - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
    }
  }
}

export default Sprite;