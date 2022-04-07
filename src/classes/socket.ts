import { Socket } from "socket.io-client";

export class SocketIO {
  private uri = 'https://samurai-fight.herokuapp.com/';
  socket!: Socket;

  constructor(io: any) { 
    this.socket = io(this.uri);
  }

  public emit(ev: string, data: any): void {
    this.socket.emit(ev, data);
  }

  public listen(ev: string, cb: (data: any) => void) {
    this.socket.on(ev, cb)
  }
}