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