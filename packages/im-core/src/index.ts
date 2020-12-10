import { io, Socket } from 'socket.io-client';

const Group = 'Group';
const Single = 'Single';

export const SendType = {
  Group,
  Single,
};

type ISendType = keyof typeof SendType

const UserSendMessage = 'UserSendMessage';
const UserCreateGroup = 'UserCreateGroup';
const UserEnterGroup = 'UserEnterGroup';

export const MessageType = {
  UserSendMessage,
  UserCreateGroup,
  UserEnterGroup,
};

export type IRespType = keyof typeof MessageTypeResp

export const OtherSendMessage = 'OtherSendMessage';
export const OtherInviteGroup = 'OtherInviteGroup';

export const MessageTypeResp = {
  OtherSendMessage,
  OtherInviteGroup,
};

type ISubsMap = {
  [subsType in IRespType]?: (VoidFunc)[]
}

class ImCore {
  private _socketInstance: Socket;
  private _subsMap: ISubsMap = {};
  private static _imCoreInstance: ImCore;

  // 单例
  constructor(private _socketUrl: string, private _userInfo: IUserInfo) {
    if (ImCore._imCoreInstance) {
      return ImCore._imCoreInstance;
    }
    this._socketInstance = io(_socketUrl, {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    });
    ImCore._imCoreInstance = this;
    for (const type of Object.keys(MessageTypeResp)) {
      this._subsMap[type] = [];
      this._socketInstance.on(type, (...rest: any[]) => this._subsMap[type].forEach(cb => {
        try {
          cb(...rest);
        } catch (err) {
          console.error('Error in ImCore constructor cb flush:  ', err);
        }
      }));
    }
  }

  public sendMessage(type: ISendType, receiverId: number, text: ITextPayload['text']): void {
    const reqBody: IReqBody = {
      timestamp: +new Date(),
      userInfo: this._userInfo,
      receiverId,
      payload: { text },
    };
    this._socketInstance.emit(UserSendMessage, type, reqBody);
  }

  public sendSingleMessage(receiverId: number, text: ITextPayload['text']): void {
    this.sendMessage(Single, receiverId, text);
  }

  public sendGroupMessage(receiverId: number, text: ITextPayload['text']): void {
    this.sendMessage(Group, receiverId, text);
  }

  public createGroup(payload: ICreateGroupPayload): void {
    console.log('createGroup');  // todo createGroup
  }

  public enterGroup(payload: IEnterGroupPayload): void {
    console.log('enterGroup');  // todo enterGroup
  }

  public subChannel(type: IRespType, cb: VoidFunc): void {
    const typeCbs = this._subsMap[type];
    if (!typeCbs!.includes(cb))
      typeCbs!.push(cb);
  };

  public unsubChannle(type: IRespType, cb: VoidFunc): void {
    const typeCbs = this._subsMap[type];
    if (!typeCbs ||
      !typeCbs.includes(cb)) return;
    const idx = typeCbs.indexOf(cb);
    typeCbs.splice(idx, 1);
  };
}

export default ImCore;
