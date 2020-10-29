declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}

// mobx store
declare interface AppStore {
    chatroomNameList: () => chatroomNameItem[],

    addMessage: (chatroomId: number, messageObj: messageItem) => void

    chatroomList: chatroomInfoItem[],

}

// 聊天室面板信息，显示在chatroomList中预览的
declare interface chatroomNameItem {
    id: number,
    name: string,
    // 最近消息
    recentMessage: string,
}

// 聊天室信息对象
declare interface chatroomInfoItem {
    id: number,
    name: string,
    messageList: messageItem[]
}

// 消息体
declare interface messageItem {
    id: number,
    personName: string,
    message: string
}
