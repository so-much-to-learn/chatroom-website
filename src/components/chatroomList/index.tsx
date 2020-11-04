import React from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.css'

const ChatroomList: React.FC = inject('store')(observer((props: any) => {
    const { store } = props

    return (
        <div className={ styles.container }>
            { store.chatroomNameList
                .map((chatroomObj: chatroomNameItem) =>
                    <ChatroomItem key={ chatroomObj.id }
                                  roomName={ chatroomObj.name }
                                  recentMessage={ chatroomObj.recentMessage }/>)
            }
        </div>
    )
}))

const ChatroomItem = (props: any) => {
    const { roomName, recentMessage } = props
    return (
        <div className={ styles.chatroomItem }>
            <div className={ styles.header }>
                { roomName }
            </div>
            <div className={ styles.content }>
                { recentMessage }
            </div>
        </div>
    )
}

export default ChatroomList
