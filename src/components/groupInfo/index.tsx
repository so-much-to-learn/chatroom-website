import React from 'react'
import { observer } from 'mobx-react'
import styles from './index.module.scss'
import store from 'store'

const GroupInfo: React.FC = observer((props) => {
    return (
        <div className={ styles.container }>
            { store.currentChatroom?.name }
        </div>
    )
})

export default GroupInfo
