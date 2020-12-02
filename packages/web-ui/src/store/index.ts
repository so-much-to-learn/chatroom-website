// import { action, computed, observable } from 'mobx'
// import * as Api from 'apis'
// import { USER_INFO, USER_SEND_MESSAGE, USER_SEND_MESSAGE_RES } from 'constants/browser'
// import { io, Socket } from 'socket.io-client'
// import { BaseURL } from 'constants/server'
//
// const socket = io(BaseURL, { transports: ['websocket', 'xhr-polling', 'jsonp-polling'] })
//
// class AppStore {
//     /**
//      * 用户信息
//      * @type {userInfo}
//      */
//     @observable
//     userInfo: userInfo = {
//         uid: null,
//         username: null
//     }
//
//     public socket: Socket = socket
//
//     /**
//      * 聊天室信息列表
//      * @type {IChatroomInfoItem[]}
//      */
//     @observable
//     chatroomInfoList: IChatroomInfoItem[] = []
//
//     // 当前聊天室
//     @observable
//     currentChatroom: IChatroomInfoItem | null = null
//
//     constructor() {
//         this._getUserInfo()
//         socket.on(USER_SEND_MESSAGE_RES, ({ chatroomId, newMessage }: { chatroomId: number, newMessage: IMessageItem }) => {
//             this.chatroomInfoList
//                 .find(chatroom => chatroom.id === chatroomId)
//                 ?.messageList.push(newMessage)
//         })
//     }
//
//     // 计算属性： 获取左侧群列表信息
//     @computed
//     get chatroomNameList(): IChatroomNameItem[] {
//         return this.chatroomInfoList.map(T => {
//             const lastMessage = T.messageList.slice(-1)[0]
//             return ({
//                 id: T.id,
//                 name: T.name,
//                 recentMessage: lastMessage?.message,
//                 recentMessageUsername: lastMessage?.username
//             })
//         })
//     }
//
//     // 用户在群组发送消息
//     @action
//     addMessage(chatroomId: number, messageObj: IMessageItemRequest) {
//         socket.emit(USER_SEND_MESSAGE, { chatroomId, messageObj })
//     }
//
//     // 用户登录
//     @action
//     async userLogin({ username, password }: loginQuery = {}) {
//         const userInfo = await Api.userLogin({ username, password })
//         userInfo && sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
//         return this.userInfo = userInfo
//     }
//
//     // 获取群list信息
//     @action
//     async getChatroomInfoList() {
//         return this.chatroomInfoList = await Api.chatroomInfoList()
//     }
//
//     // 清空用户信息
//     @action
//     resetUserInfo(): void {
//         this.userInfo = { uid: null, username: null }
//         sessionStorage.removeItem(USER_INFO)
//     }
//
//     // 切换群
//     @action
//     changeChatroom(chatroomId: number): IChatroomInfoItem | null {
//         return this.currentChatroom = this.chatroomInfoList.find((T: IChatroomInfoItem) => T.id === chatroomId) || null
//     }
//
//     // 获取保存在sessionStorage中的用户信息，刷新页面的时候不需要重新登录
//     private _getUserInfo() {
//         const value = sessionStorage.getItem(USER_INFO)
//         this.userInfo = value ? JSON.parse(value) : value
//     }
// }
//
// const store: IAppStore = new AppStore()
//
// export default store
//
// declare interface IAppStore {
//     socket: Socket,
//     chatroomNameList: IChatroomNameItem[],
//     addMessage: (chatroomId: number, messageObj: IMessageItemRequest) => void
//     userInfo: userInfo,
//     chatroomInfoList: IChatroomInfoItem[],
//     currentChatroom: IChatroomInfoItem | null,
//     userLogin: ({ username, password }: loginQuery) => Promise<userInfo>,
//     getChatroomInfoList: () => Promise<IChatroomInfoItem[]>,
//     changeChatroom: (chatroomId: number) => IChatroomInfoItem | null,
//     resetUserInfo: () => void
// }
