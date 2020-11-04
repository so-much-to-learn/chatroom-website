import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import SettingBar from '../../components/settingBar/index'
import ChatroomList from '../../components/chatroomList'
import GroupInfo from '../../components/groupInfo'
import ChattingPanel from '../../components/chattingPanel'
import TypewritingPanel from '../../components/typewritingPanel'
import { useHistory } from 'react-router'

const Home: React.FC = inject('store')(observer((props: any) => {
    const { store } = props
    if (!store?.userInfo?.uid) {
        const history = useHistory()
        history.push('/login')
    }
    return (
        <div className='home'>
            { store.chatroomNameList
                .map((chatroomObj: chatroomNameItem) =>
                    <div key={ chatroomObj.id }>{ chatroomObj.recentMessage }</div>)
            }
            <SettingBar/>
            <ChatroomList/>
            <GroupInfo/>
            <ChattingPanel/>
            <TypewritingPanel/>
        </div>
    )
}))

export default Home
