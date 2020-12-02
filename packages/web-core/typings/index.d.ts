import { Socket } from 'socket.io-client';
import { socketInstance, getSocketInstance } from '../src/index';

declare module 'web-core' {
  export { socketInstance, getSocketInstance };
}
