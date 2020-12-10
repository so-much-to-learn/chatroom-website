import { Socket } from 'socket.io-client';
import ImCore from '../src/index';

declare module 'im-core' {
  export default ImCore;
}

declare global {
  interface IUserInfo {
    uid: number | null;
    username: string | null;
  }

  interface IReqBody {
    timestamp: number;
    userInfo: IUserInfo;
    receiverId: number;
    payload?: IPayload;
  }

  type IPayload = ITextPayload | ICreateGroupPayload | IEnterGroupPayload

  interface ITextPayload {
    text: string
  }

  interface ICreateGroupPayload {
    groupName: string;
    password: string;
  }

  interface IEnterGroupPayload {
    id: string;
    password: string;
  }

  type VoidFunc = (...rest: any[]) => void
}
