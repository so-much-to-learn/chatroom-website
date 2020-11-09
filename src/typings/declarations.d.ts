declare module '*.css' {
    const content: { [className: string]: string }
    export = content;
}

declare module '*.scss' {
    const content: { [className: string]: string }
    export = content;
}

// mobx store
declare interface AppStore {
    chatroomNameList: () => IChatroomNameItem[],
    addMessage: (chatroomId: number, messageObj: IMessageItem) => void
    chatroomList: IChatroomInfoItem[],
}

declare interface apiResponse<T = any> {
    code: number,
    data?: T,
    message?: string
}

declare interface userInfo {
    uid: number | null,
    username: string | null,
}

declare interface loginQuery {
    username?: string,
    password?: string
}

// 聊天室面板信息，显示在chatroomList中预览的
declare interface IChatroomNameItem {
    id: number,
    name: string,
    // 最近消息
    recentMessage: string,
}

// 聊天室信息对象
declare interface IChatroomInfoItem {
    id: number,
    name: string,
    messageList: IMessageItem[]
}

// 消息体
declare interface IMessageItem {
    id: number,
    personName: string,
    message: string
}
