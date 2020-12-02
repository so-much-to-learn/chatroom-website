import { Socket } from 'socket.io-client';

declare const socketInstance: Socket;

declare function getSocketInstance(string): Socket

declare module 'web-core' {
  export { socketInstance, getSocketInstance };
}
