export interface Coords {
  x: number;
  y: number;
  back?: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface AttackBox {
  pos?: Coords;
  w: number;
  h: number;
  offset: Coords;
  default: Size;
  special?: Size;
}

export interface Stats {
  name: string;
  hp: number;
  att: number;
  def: number;
  vel: number;
  max?: number;
}

export interface Sprites {
  idle: SpriteImage;
  run: SpriteImage;
  jump: SpriteImage;
  fall: SpriteImage;
  attack1: SpriteImage;
  attack2: SpriteImage;
  hit: SpriteImage;
  death: SpriteImage;
}

interface SpriteImage {
  frames: number;
  image?: HTMLImageElement;
  reverse?: HTMLImageElement;
}