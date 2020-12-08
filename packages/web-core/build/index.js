import { io } from 'socket.io-client';
var SendType;
(function (SendType) {
    SendType[SendType["Group"] = 0] = "Group";
    SendType[SendType["Single"] = 1] = "Single";
})(SendType || (SendType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["UserSendMessage"] = 0] = "UserSendMessage";
    MessageType[MessageType["UserCreateGroup"] = 1] = "UserCreateGroup";
    MessageType[MessageType["UserEnterGroup"] = 2] = "UserEnterGroup";
})(MessageType || (MessageType = {}));
class SocketCore {
    constructor(socketUrl, userInfo) {
        if (SocketCore._SocketCoreInstance) {
            return SocketCore._SocketCoreInstance;
        }
        this._socketInstance = io(socketUrl, {
            transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
        });
        SocketCore._SocketCoreInstance = this;
    }
    static getInstance(socketUrl, userInfo) {
        if (SocketCore._SocketCoreInstance) {
            return SocketCore._SocketCoreInstance;
        }
        return (SocketCore._SocketCoreInstance = new SocketCore(socketUrl, userInfo));
    }
    sentMessage(payload, type) {
        this._socketInstance.emit(MessageType.UserSendMessage);
    }
}
// 组成消息体
const generateCommBody = ({}) => { };
export default SocketCore;
//# sourceMappingURL=index.js.map