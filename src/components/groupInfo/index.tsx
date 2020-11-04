import React from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.css'

const GroupInfo: React.FC = inject('store')(observer((props: any) => {
    return (
        <div className={ styles.container }>
            GroupInfo
        </div>
    )
}))

export default GroupInfo
