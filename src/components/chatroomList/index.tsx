import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'

const ChatroomList: React.FC = inject('store')(observer((props: any) => {
    const { store } = props

    useEffect(() => {
        store.getChatroomInfoList()
    }, [])

    return (
        <div className={ styles.container }>
            { store.chatroomNameList.length
                ? store.chatroomNameList
                    .map((chatroomObj: IChatroomNameItem) =>
                        <ChatroomItem key={ chatroomObj.id }
                                      id={ chatroomObj.id }
                                      name={ chatroomObj.name }
                                      recentMessage={ chatroomObj.recentMessage }/>)
                : '正在请求房间列表'
            }
        </div>
    )
}))

const ChatroomItem = (props: any) => {
    const { name, recentMessage } = props
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
}

export default ChatroomList
