import { action, computed, observable } from 'mobx'
import * as Api from 'apis'

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
        return Api.userLogin({ username, password })
            .then(data => this.userInfo = data)
    }
}

const store: AppStore = new AppStore()

export default store
