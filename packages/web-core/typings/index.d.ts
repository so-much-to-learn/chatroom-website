import { Socket } from 'socket.io-client';
import SocketCore from '../src/index';

declare module 'web-core' {
  export default SocketCore;
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
    payload: ISinglePayload | IGroupPayload | null;
  }

  interface ISinglePayload {
    text: string
  }

  interface IGroupPayload {
    text: string
  }
}
