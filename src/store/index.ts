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
        username: null,
        token: null
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

    @action
    async userLogin({ username, password }: loginQuery = {}) {
        this.userInfo = await Api.userLogin({ username, password })
    }
}

const store: AppStore = new AppStore()

export default store
