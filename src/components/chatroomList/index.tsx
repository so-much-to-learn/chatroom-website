import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.scss'
import { ACTIONS, Context } from 'context/index'
import * as Api from 'apis'

const ChatroomList: React.FC = () => {
    const { state, dispatch } = useContext(Context)

    return (
        <div className={ styles.container }>
            { state.chatroomNameListMemo?.length
                ? state.chatroomNameListMemo
                    .map((chatroomObj: IChatroomNameItem) =>
                        <ChatroomItem { ...chatroomObj } key={ chatroomObj.id }/>)
                : '正在请求房间列表'
            }
        </div>
    )
}

const ChatroomItem: React.FC<IChatroomNameItem> = (props) => {
    const { name, recentMessage, id, recentMessageUsername } = props
    const { state, dispatch } = useContext(Context)

    const handleChangeChatroom = () => {
        dispatch({ type: ACTIONS.CHANGE_CHATROOM, payload: { chatroomId: id } })
    }

    return (
        <div className={ `${ styles.chatroomItem } ${ id === state.currentChatroom?.id ? styles['is-active'] : '' }` }
             onClick={ handleChangeChatroom }>
            <div className={ styles.header }>
                { name }
            </div>
            <div className={ styles.content }>
                { recentMessageUsername }： { recentMessage }
            </div>
        </div>
    )
}

export default ChatroomList
