import { action, computed, observable } from 'mobx'

class AppStore {
    @computed get chatroomNameList() {
        return this.chatroomList.map(T => ({
            name: T.name,
            id: T.id,
            recentMessage: T.messageList[T.messageList.length - 1]['message']
        }))
    }

    @observable chatroomList = [
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

    @action addMessage(chatroomId, messageObj) {
        console.log('addMessage')
    }
}

const store = new AppStore()

export default store
