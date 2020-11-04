import { action, computed, observable } from 'mobx'
import * as Api from 'apis'
import { USER_INFO } from 'constants/browser'

class AppStore {
    constructor() {
        this._getUserInfo()
    }

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
     * 聊天室信息
     * @type {chatroomInfoItem[]}
     */
    @observable
    chatroomList: chatroomInfoItem[] = [
        {
            id: 1,
            name: '哈罗群',
            messageList:
                [
                    { id: 123, personName: '小明', message: 'this is my message.' },
                    { id: 124, personName: '小红', message: 'my exam is passed.' }
                ]
        }
    ]

    // 计算属性： 获取左侧群列表信息
    @computed
    get chatroomNameList(): chatroomNameItem[] {
        return this.chatroomList.map(T => ({
            id: T.id,
            name: T.name,
            recentMessage: T.messageList[T.messageList.length - 1]['message']
        }))
    }

    @action
    addMessage(chatroomId: number, messageObj: messageItem) {
        console.log('addMessage')
    }

    // 清空用户信息
    @action
    resetUserInfo(): void {
        this.userInfo = { uid: null, username: null }
    }

    // 用户登录
    @action
    async userLogin({ username, password }: loginQuery = {}) {
        const { data: userInfo } = await Api.userLogin({ username, password })
        sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
        return this.userInfo = userInfo
    }

    // 获取保存在sessionStorage中的用户信息，刷新页面的时候不需要重新登录
    _getUserInfo() {
        const value = sessionStorage.getItem(USER_INFO)
        this.userInfo = value ? JSON.parse(value) : value
    }
}

const store: AppStore = new AppStore()

export default store
