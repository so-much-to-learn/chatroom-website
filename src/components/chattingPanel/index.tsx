import React, { useRef, useEffect, useContext } from 'react'
import styles from 'components/chattingPanel/index.module.scss'
import { USER_SEND_MESSAGE_RES } from 'constants/browser'
import { Context, ACTIONS } from 'context/index'

const ChattingPanel: React.FC = () => {
    const { state, dispatch } = useContext(Context)
    const chattingPanelDom = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chattingPanelDom.current?.lastElementChild?.scrollIntoView()
    })

    return (
        <div className={ styles.container }
             ref={ chattingPanelDom }>
            { state.currentChatroom?.messageList.map(messageItem => (
                <Message { ...messageItem } currUid={ state.userInfo.uid } key={ messageItem.messageId }/>
            )) }
        </div>
    )
}

const Message: React.FC<{ currUid: number | null } & IMessageItem> = React.memo((props) => {
    const { uid, username, message, currUid } = props

    return (
        <div className={ uid === currUid ? 'message-item is-me' : 'message-item' }>
            <div className='message-item-username'>{ username }</div>
            <pre className='message-item-message'>{ message }</pre>
        </div>
    )
})

export default ChattingPanel
