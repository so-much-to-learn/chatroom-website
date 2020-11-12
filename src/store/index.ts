import { action, computed, observable } from 'mobx'
import * as Api from 'apis'
import { USER_INFO } from 'constants/browser'

class AppStore {
    /**
     * 用户信息
     * @type {userInfo}
     */
    @observable
    userInfo: userInfo = {
        uid: null,
        username: null
    }

    /**
     * 聊天室信息列表
     * @type {IChatroomInfoItem[]}
     */
    @observable
    chatroomInfoList: IChatroomInfoItem[] = []

    // 当前聊天室
    @observable
    currentChatroom: IChatroomInfoItem | null = null

    constructor() {
        this._getUserInfo()
    }

    // 计算属性： 获取左侧群列表信息
    @computed
    get chatroomNameList(): IChatroomNameItem[] {
        return this.chatroomInfoList.map(T => ({
            id: T.id,
            name: T.name,
            recentMessage: T.messageList.slice(-1)[0]?.message
        }))
    }

    // 用户在群组发送消息
    @action
    addMessage(chatroomId: number, messageObj: IMessageItemRequest) {
        console.log('addMessage:', chatroomId, messageObj)
    }

    // 用户登录
    @action
    async userLogin({ username, password }: loginQuery = {}) {
        const userInfo = await Api.userLogin({ username, password })
        userInfo && sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
        return this.userInfo = userInfo
    }

    // 获取群list信息
    @action
    async getChatroomInfoList() {
        return this.chatroomInfoList = await Api.chatroomInfoList()
    }

    // 清空用户信息
    @action
    resetUserInfo(): void {
        this.userInfo = { uid: null, username: null }
    }

    // 切换群
    @action
    changeChatroom(chatroomId: number): IChatroomInfoItem | null {
        return this.currentChatroom = this.chatroomInfoList.find((T: IChatroomInfoItem) => T.id === chatroomId) || null
    }

    // 获取保存在sessionStorage中的用户信息，刷新页面的时候不需要重新登录
    private _getUserInfo() {
        const value = sessionStorage.getItem(USER_INFO)
        this.userInfo = value ? JSON.parse(value) : value
    }
}

const store: IAppStore = new AppStore()

export default store
