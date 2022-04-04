export interface Coords {
  x: number;
  y: number;
}

export interface AttackBox {
  pos?: Coords;
  w: number;
  h: number;
  offset: Coords;
}

export interface Stats {
  name: string;
  hp: number;
  att: number;
  def: number;
  vel: number;
}

export interface Sprites {
  idle: SpriteImage,
  run: SpriteImage,
  jump: SpriteImage,
  fall: SpriteImage,
  attack1: SpriteImage,
  attack2: SpriteImage,
  hit: SpriteImage
}

interface SpriteImage {
  frames: number;
  image?: HTMLImageElement;
  reverse?: HTMLImageElement;
}