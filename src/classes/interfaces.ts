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
}

export interface Sprites {
  idle: {
    frames: number;
    src: string;
    image?: HTMLImageElement
  },
  run: {
    frames: number;
    src: string;
    image?: HTMLImageElement
  },
  jump: {
    frames: number;
    src: string;
    image?: HTMLImageElement
  },
  fall: {
    frames: number;
    src: string;
    image?: HTMLImageElement
  }
}