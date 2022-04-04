import { context } from "./canvas.js";
import { Coords } from "./interfaces.js";

class Sprite {
  img!: HTMLImageElement | undefined;

  constructor(
    public pos: Coords,
    public src?: string | undefined,
    public scale = 1,
    public frames = 1,
    public offset: Coords = {x: 0, y: 0},
    public current = 0,
    public elapsed = 0,
    public hold = 10,
  ) { 
    this.img = new Image();
    if (src) this.img.src = src;
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

  public update(): void {
    this.draw();
  }

  public animate(): void {
    this.elapsed++;

    if (this.elapsed % this.hold === 0) {
      if (this.current < this.frames - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
    }
  }
}

export default Sprite;