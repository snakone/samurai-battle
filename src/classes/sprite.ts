import { context } from "./canvas.js";
import { Coords } from "./interfaces.js";

const hold = 6;  // Framerate

class Sprite {
  img!: HTMLImageElement | undefined;

  constructor(
    public pos: Coords,  // Position
    public src?: string | undefined,  // Source
    public scale = 1,
    public frames = 1,
    public offset: Coords = {x: 0, y: 0},
    public current = 0,
    public elapsed = 0  // Total Frames
  ) { 
    this.img = new Image();
    if (src) this.img.src = src;
  }

  public updateSprite(dead: boolean = false): void {
    this.draw();
    if (!dead) this.animate();
  }

  public draw(): void {
    if (this.img && this.frames) {
      context?.drawImage(
        this.img, // Source
        this.current * (this.img.width / this.frames),  // X
        0,  // Y
        this.img.width / this.frames,  // Width
        this.img.height,  // Height
        this.pos.x - this.offset.x, // Offset
        this.pos.y - this.offset.y, 
        (this.img.width / this.frames) * this.scale,  // Scale
        this.img.height * this.scale
      );
    }
  }

  public animate(): void {
    this.elapsed++;
    if (this.elapsed % hold === 0) {
      this.current < this.frames - 1 ? 
      this.current++ : this.current = 0;
    }
  }
}

export default Sprite;