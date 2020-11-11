declare module '*.css' {
    const content: { [className: string]: string }
    export = content;
}

declare module '*.scss' {
    const content: { [className: string]: string }
    export = content;
}

// 聊天室信息对象
declare interface IChatroomInfoItem {
    id: number,
    name: string,
    messageList: IMessageItem[]
}

// mobx store
declare interface IAppStore {
    chatroomNameList: IChatroomNameItem[],
    addMessage: (chatroomId: number, messageObj: IMessageItem) => void
    userInfo: userInfo,
    chatroomInfoList: IChatroomInfoItem[],
    currentChatroom: IChatroomInfoItem | null,
    userLogin: ({ username, password }: loginQuery) => Promise<userInfo>,
    getChatroomInfoList: () => void,
    changeChatroom: (chatroomId: number) => IChatroomInfoItem | null,
    resetUserInfo: () => void
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

// 消息体
declare interface IMessageItem {
    uid: number,
    personName: string,
    message: string
}

// 有store的props
interface IPropsWithStore {
    store: IAppStore,
}
