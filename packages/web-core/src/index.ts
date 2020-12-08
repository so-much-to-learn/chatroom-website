import { io, Socket } from 'socket.io-client';
import { Manager } from 'socket.io-client/build/manager';
import { SocketOptions } from 'socket.io-client/build/socket';

interface userInfo {
  uid: number | null;
  username: string | null;
}

enum SendType {
  Group,
  Single,
}

enum MessageType {
  UserSendMessage,
  UserCreateGroup,
  UserEnterGroup,
}

class SocketCore {
  private _socketInstance;
  private static _SocketCoreInstance: SocketCore;

  constructor(socketUrl: string, userInfo: userInfo) {
    if (SocketCore._SocketCoreInstance) {
      return SocketCore._SocketCoreInstance;
    }
    this._socketInstance = io(socketUrl, {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    });
    SocketCore._SocketCoreInstance = this;
  }

  public static getInstance(socketUrl, userInfo) {
    if (SocketCore._SocketCoreInstance) {
      return SocketCore._SocketCoreInstance;
    }
    return (SocketCore._SocketCoreInstance = new SocketCore(socketUrl, userInfo));
  }

  public sentMessage(payload: unknown, type: SendType): void {
    this._socketInstance.emit(MessageType.UserSendMessage);
  }
}

// 组成消息体
const generateCommBody = ({}) => {};

export default SocketCore;
