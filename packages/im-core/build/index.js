import { io } from 'socket.io-client';
const Group = 'Group';
const Single = 'Single';
export const SendType = {
    Group,
    Single,
};
const UserSendMessage = 'UserSendMessage';
const UserCreateGroup = 'UserCreateGroup';
const UserEnterGroup = 'UserEnterGroup';
export const MessageType = {
    UserSendMessage,
    UserCreateGroup,
    UserEnterGroup,
};
export const OtherSendMessage = 'OtherSendMessage';
export const OtherInviteGroup = 'OtherInviteGroup';
export const MessageTypeResp = {
    OtherSendMessage,
    OtherInviteGroup,
};
class ImCore {
    // 单例
    constructor(_socketUrl, _userInfo) {
        this._socketUrl = _socketUrl;
        this._userInfo = _userInfo;
        this._subsMap = {};
        if (ImCore._imCoreInstance) {
            return ImCore._imCoreInstance;
        }
        this._socketInstance = io(_socketUrl, {
            transports: ['websocket', 'xhr-polling', 'jsonp-polling'],
        });
        ImCore._imCoreInstance = this;
        for (const type of Object.keys(MessageTypeResp)) {
            this._subsMap[type] = [];
            this._socketInstance.on(type, (...rest) => this._subsMap[type].forEach(cb => {
                try {
                    cb(...rest);
                }
                catch (err) {
                    console.error('Error in ImCore constructor cb flush:  ', err);
                }
            }));
        }
    }
    sendMessage(type, receiverId, text) {
        const reqBody = {
            timestamp: +new Date(),
            userInfo: this._userInfo,
            receiverId,
            payload: { text },
        };
        this._socketInstance.emit(UserSendMessage, type, reqBody);
    }
    sendSingleMessage(receiverId, text) {
        this.sendMessage(Single, receiverId, text);
    }
    sendGroupMessage(receiverId, text) {
        this.sendMessage(Group, receiverId, text);
    }
    createGroup(payload) {
        console.log('createGroup'); // todo createGroup
    }
    enterGroup(payload) {
        console.log('enterGroup'); // todo enterGroup
    }
    subChannel(type, cb) {
        const typeCbs = this._subsMap[type];
        if (!typeCbs.includes(cb))
            typeCbs.push(cb);
    }
    ;
    unsubChannle(type, cb) {
        const typeCbs = this._subsMap[type];
        if (!typeCbs ||
            !typeCbs.includes(cb))
            return;
        const idx = typeCbs.indexOf(cb);
        typeCbs.splice(idx, 1);
    }
    ;
}
export default ImCore;
//# sourceMappingURL=index.js.map