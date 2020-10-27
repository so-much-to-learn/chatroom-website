import React, {Component} from 'react'
import style from './index.module.scss'

export default class SettingBar extends Component {
    render() {
        return (
            <div className={style.settingBar}>
                setting bar
                <div className={style.manageBtn}>
                    manage-btn
                </div>
            </div>
        )
    }
}
