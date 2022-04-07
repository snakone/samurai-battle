import { SocketIO } from './classes/socket.js';
import { start } from './utils/functions.js';

declare const io: any;
export const socket = new SocketIO(io);

start();





