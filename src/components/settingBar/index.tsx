import React from 'react'
import { observer } from 'mobx-react'
import styles from './index.module.scss'
import { useHistory } from 'react-router'
import store from 'store'

const SettingBar: React.FC = (props) => {
    const history = useHistory()

    const handleLogout = () => {
        store.resetUserInfo()
        history.push('/login')
    }

    return (
        <div className={ styles.container }>
            <div className='top-btns'>
                <div className='top-btn' onClick={ handleLogout }/>
                <div className='top-btn'/>
                <div className='top-btn'/>
            </div>
        </div>
    )
}

export default observer(SettingBar)
