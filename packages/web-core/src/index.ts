import { io, Socket } from 'socket.io-client';

const Group = 'Group';
const Single = 'Single';

const SendType = {
  Group,
  Single,
};

type ISendType = keyof typeof SendType

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

  // 单例
  constructor(private _socketUrl: string, private _userInfo: IUserInfo) {
    if (SocketCore._SocketCoreInstance) {
      return SocketCore._SocketCoreInstance;
    }
    this._socketInstance = io(_socketUrl, {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    });
    SocketCore._SocketCoreInstance = this;
  }

  public sentMessage(type: ISendType, receiverId: number, payload: ISinglePayload | IGroupPayload | null): void {
    const reqBody: IReqBody = {
      timestamp: +new Date(),
      userInfo: this._userInfo,
      receiverId,
      payload,
    };
    this._socketInstance.emit(type, reqBody);
  }
}

export default SocketCore;
