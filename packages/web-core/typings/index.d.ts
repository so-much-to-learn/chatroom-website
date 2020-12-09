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
    code: number;
    message: string | null;
    payload: object | null;
  }
}
