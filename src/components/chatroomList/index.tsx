import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
import store from 'store'

const ChatroomList: React.FC = observer((props) => {
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
})

const ChatroomItem: React.FC<IChatroomNameItem> = observer((props) => {
    const { name, recentMessage, id } = props

    const handleChangeChatroom = () => {
        store.changeChatroom(id)
    }

    return (
        <div className={ styles.chatroomItem } onClick={ handleChangeChatroom }>
            <div className={ styles.header }>
                { name }
            </div>
            <div className={ styles.content }>
                { recentMessage }
            </div>
        </div>
    )
})

export default ChatroomList
