import React from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'

const SettingBar: React.FC = inject('store')(observer((props: any) => {
    return (
        <div className={ styles.container }>
            settingbar
        </div>
    )
}))

export default SettingBar
