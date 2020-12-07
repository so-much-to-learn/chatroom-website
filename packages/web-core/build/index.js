import { io } from 'socket.io-client';
class SocketServe {
    constructor(socketUrl, userInfo) {
        if (SocketServe._SocketServeInstance) {
            return SocketServe._SocketServeInstance;
        }
        this._socketInstance = io(socketUrl, {
            transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
        });
        SocketServe._SocketServeInstance = this;
    }
    static getInstance(socketUrl, userInfo) {
        if (SocketServe._SocketServeInstance) {
            return SocketServe._SocketServeInstance;
        }
        return (SocketServe._SocketServeInstance = new SocketServe(socketUrl, userInfo));
    }
    sentMessage(payload) { }
}
export default SocketServe;
//# sourceMappingURL=index.js.map