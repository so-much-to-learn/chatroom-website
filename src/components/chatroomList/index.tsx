import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react'
import styles from './index.module.scss'
import { ACTIONS, Context } from 'context/index'
import * as Api from 'apis'

const ChatroomList: React.FC = () => {
    const { state, dispatch } = useContext(Context)

    const handleChangeChatroom = useCallback((id: number) => {
        dispatch({ type: ACTIONS.CHANGE_CHATROOM, payload: { chatroomId: id } })
    }, [])

    return (
        <div className={ styles.container }>
            { state.chatroomNameListMemo?.length
                ? state.chatroomNameListMemo
                    .map((chatroomObj: IChatroomNameItem) =>
                        <ChatroomItem { ...chatroomObj } key={ chatroomObj.id }
                                      handleChangeChatroom={ handleChangeChatroom }
                                      currentChatroomId={ state.currentChatroom?.id }/>)
                : '正在请求房间列表'
            }
        </div>
    )
}

const ChatroomItem: React.FC<IChatroomNameItem & { currentChatroomId: number | undefined, handleChangeChatroom: Function }> = React.memo((props) => {
    const { name, recentMessage, id, recentMessageUsername, currentChatroomId, handleChangeChatroom } = props
    const handleChangeChatroomItem = () => handleChangeChatroom(id)

    return (
        <div className={ `${ styles.chatroomItem } ${ id === currentChatroomId ? styles['is-active'] : '' }` }
             onClick={ handleChangeChatroomItem }>
            <div className={ styles.header }>
                { name }
            </div>
            <div className={ styles.content }>
                { recentMessageUsername }： { recentMessage }
            </div>
        </div>
    )
})

export default ChatroomList
