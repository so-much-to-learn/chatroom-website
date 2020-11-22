import React, { useContext } from 'react'
import styles from './index.module.scss'
import { Context, ACTIONS } from 'context/index'

const GroupInfo: React.FC = (props) => {
    const { state, dispatch } = useContext(Context)

    return (
        <div className={ styles.container }>
            { state.currentChatroom?.name }
        </div>
    )
}

export default GroupInfo
