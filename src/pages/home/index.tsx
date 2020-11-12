import React, { Component } from 'react'
import { observer } from 'mobx-react'
import SettingBar from 'components/settingBar/index'
import ChatroomList from 'components/chatroomList'
import GroupInfo from 'components/groupInfo'
import ChattingPanel from 'components/chattingPanel'
import TypewritingPanel from 'components/typewritingPanel'
import { useHistory } from 'react-router'
import styles from './index.module.scss'
import store from 'store'

const Home: React.FC = (props) => {
    if (!store?.userInfo?.uid) {
        const history = useHistory()
        history.push('/login')
    }

    return (
        <div className={ styles.home }>
            <div className={ styles.container }>
                <SettingBar/>
                <ChatroomList/>
                <div className={ styles.room }>
                    <GroupInfo/>
                    <ChattingPanel/>
                    <TypewritingPanel/>
                </div>
            </div>
        </div>
    )
}

export default observer(Home)
