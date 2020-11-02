import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import SettingBar from '../../components/settingBar/index'
import ChatroomList from '../../components/chatroomList'
import GroupInfo from '../../components/groupInfo'
import ChattingPanel from '../../components/chattingPanel'
import TypewritingPanel from '../../components/typewritingPanel'

@inject('store')
@observer
export default class Home extends Component {
  render() {
    // @ts-ignore
    const { store } = this.props
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
  }
}

