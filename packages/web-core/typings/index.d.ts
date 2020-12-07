import { Socket } from 'socket.io-client';
import { socketInstance, getSocketInstance } from '../src/index';

declare module 'web-core' {
  export default SocketServe;
}

export declare interface userInfo {
  uid: number | null;
  username: string | null;
}

export declare class SocketServe {
  private _socketInstance: Socket;
  private static _SocketServeInstance: SocketServe;

  constructor(socketUrl: string, userInfo: userInfo);

  public static getInstance(socketUrl: string, userInfo: userInfo): SocketServe;
}
