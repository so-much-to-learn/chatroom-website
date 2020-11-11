import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'

const ChatroomList: React.FC<IPropsWithStore> = inject('store')(observer((props) => {
    const { store } = props

    useEffect(() => {
        store.getChatroomInfoList()
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
}))

interface IChatroomItemProps extends IChatroomNameItem, IPropsWithStore {
}

const ChatroomItem: React.FC = inject('store')(observer((props) => {
    const { name, recentMessage, store } = props as IChatroomItemProps
    return (
        <div className={ styles.chatroomItem }>
            <div className={ styles.header }>
                { name }
            </div>
            <div className={ styles.content }>
                { recentMessage }
            </div>
        </div>
    )
}))

export default ChatroomList
