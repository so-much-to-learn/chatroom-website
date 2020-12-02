import { io, Socket } from 'socket.io-client';

type getSocketInstanceFunc = (string) => Socket

let socketInstance: Socket | null = null;

const getSocketInstance: getSocketInstanceFunc = (socketUrl) => {
  // 返回单例
  if (!socketInstance) {
    socketInstance = io(socketUrl, {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    });
  }
  return socketInstance;
};

export { socketInstance, getSocketInstance };
