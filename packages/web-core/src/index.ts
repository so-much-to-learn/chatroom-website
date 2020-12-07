import { io, Socket } from 'socket.io-client';
import { Manager } from 'socket.io-client/build/manager';
import { SocketOptions } from 'socket.io-client/build/socket';

type getSocketInstanceFunc = (socketUrl: string, userInfo: userInfo) => Socket;

class SocketServe {
  private _socketInstance;
  private static _SocketServeInstance: SocketServe;

  constructor(socketUrl: string, userInfo: userInfo) {
    if (SocketServe._SocketServeInstance) {
      return SocketServe._SocketServeInstance;
    }
    this._socketInstance = io(socketUrl, {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    });
    SocketServe._SocketServeInstance = this;
  }

  public static getInstance(socketUrl, userInfo) {
    if (SocketServe._SocketServeInstance) {
      return SocketServe._SocketServeInstance;
    }
    return (SocketServe._SocketServeInstance = new SocketServe(socketUrl, userInfo));
  }

  public sentMessage(payload: unknown): void {}
}

export default SocketServe;
