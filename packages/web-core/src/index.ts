import { io, Socket } from 'socket.io-client';

const Group = 'Group';
const Single = 'Single';

const SendType = {
  Group,
  Single,
};

const UserSendMessage = 'UserSendMessage';
const UserCreateGroup = 'UserCreateGroup';
const UserEnterGroup = 'UserEnterGroup';

const MessageType = {
  UserSendMessage,
  UserCreateGroup,
  UserEnterGroup,
};

// declare class ISocketCore {
//   private _socketInstance: Socket;
//   private static _SocketCoreInstance: SocketCore;
//
//   constructor(socketUrl: string, userInfo: IUserInfo);
//
//   public static getInstance(socketUrl: string, userInfo: IUserInfo): SocketCore;
//
//   public sentMessage(unknown)
// }

class SocketCore {
  private _socketInstance: Socket;
  private static _SocketCoreInstance: SocketCore;

  constructor(socketUrl: string, userInfo: IUserInfo) {
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

  public sentMessage(payload: unknown, type: keyof typeof SendType): void {
    this._socketInstance.emit(type as string);
  }
}

// 组成消息体
const generateCommBody = ({}) => {
};

export default SocketCore;
