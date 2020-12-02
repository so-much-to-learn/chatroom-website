import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

const getSocketInstance = (socketUrl) => {   // 返回单例
  if (!socketInstance) {
    socketInstance = io(socketUrl, {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
    });
  }
  return socketInstance;
};

export { socketInstance, getSocketInstance };
