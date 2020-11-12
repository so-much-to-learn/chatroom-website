import React from 'react'
import { observer } from 'mobx-react'
import styles from './index.module.scss'

const SettingBar: React.FC = (props: any) => {
    return (
        <div className={ styles.container }>
            settingbar
        </div>
    )
}

export default observer(SettingBar)
