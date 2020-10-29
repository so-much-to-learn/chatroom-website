import { action, computed, observable } from 'mobx'

class AppStore {
    @computed get chatroomNameList(): chatroomNameItem[] {
        return this.chatroomList.map(T => ({
            id: T.id,
            name: T.name,
            recentMessage: T.messageList[T.messageList.length - 1]['message']
        }))
    }

    @observable chatroomList: chatroomInfoItem[] = [
        {
            id: 1,
            name: '哈罗群',
            messageList:
                [
                    {id: 123, personName: '小明', message: 'this is my message.'},
                    {id: 124, personName: '小红', message: 'my exam is passed.'}
                ]
        }
    ]

    @action addMessage(chatroomId: number, messageObj: messageItem) {
        console.log('addMessage')
    }
}

const store: AppStore = new AppStore()

export default store
