import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import styles from './index.module.scss'
import store from 'store'

const ChatroomList: React.FC = () => {
    useEffect(() => {
        store.getChatroomInfoList()
            .then(chatroomInfoList => chatroomInfoList.length &&
                store.changeChatroom(chatroomInfoList[0].id))
    }, [])

    return (
        <div className={ styles.container }>
            { store.chatroomNameList.length
                ? store.chatroomNameList
                    .map((chatroomObj: IChatroomNameItem) =>
                        <ChatroomItem { ...chatroomObj } key={ chatroomObj.id }/>)
                : '正在请求房间列表'
            }
        </div>
    )
}

const ChatroomItem: React.FC<IChatroomNameItem> = observer((props) => {
    const { name, recentMessage, id, recentMessageUsername } = props

    const handleChangeChatroom = () => {
        store.changeChatroom(id)
    }

    return (
        <div className={ `${ styles.chatroomItem } ${ id === store.currentChatroom?.id ? styles['is-active'] : '' }` }
             onClick={ handleChangeChatroom }>
            <div className={ styles.header }>
                { name }
            </div>
            <div className={ styles.content }>
                { recentMessageUsername }： { recentMessage }
            </div>
        </div>
    )
})

export default observer(ChatroomList)
