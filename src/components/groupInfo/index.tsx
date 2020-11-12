import React from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'

const GroupInfo: React.FC = inject('store')(observer((props) => {
    const { store } = props as IPropsWithStore
    return (
        <div className={ styles.container }>
            { store.currentChatroom?.name }
        </div>
    )
}))

export default GroupInfo
