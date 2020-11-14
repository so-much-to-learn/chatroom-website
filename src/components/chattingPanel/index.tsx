import React, { useRef, useEffect } from 'react'
import styles from 'components/chattingPanel/index.module.scss'
import store from 'store'
import { observer } from 'mobx-react'
import { USER_SEND_MESSAGE_RES } from 'constants/browser'

const ChattingPanel: React.FC = () => {
    const chattingPanelDom = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chattingPanelDom.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
    })

    return (
        <div className={ styles.container }
             ref={ chattingPanelDom }>
            { store.currentChatroom?.messageList.map(messageItem => (
                <Message { ...messageItem } key={ messageItem.messageId }/>
            )) }
        </div>
    )
}

const Message: React.FC<IMessageItem> = (props) => {
    const { uid, username, message } = props
    const { userInfo } = store

    return (
        <div className={ uid === userInfo.uid ? 'message-item is-me' : 'message-item' }>
            <div className='message-item-username'>{ username }</div>
            <pre className='message-item-message'>{ message }</pre>
        </div>
    )
}

export default observer(ChattingPanel)
