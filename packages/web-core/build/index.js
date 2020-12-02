import { io } from 'socket.io-client';
let socketInstance = null;
const getSocketInstance = (socketUrl) => {
    if (!socketInstance) {
        socketInstance = io(socketUrl, {
            transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
        });
    }
    return socketInstance;
};
export { socketInstance, getSocketInstance };
//# sourceMappingURL=index.js.map