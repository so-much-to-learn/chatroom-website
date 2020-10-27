import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import SettingBar from '../../components/settingBar'

@inject('store')
@observer
export default class Home extends Component {
    componentDidMount() {
    }

    render() {
        const {store} = this.props
        return (
            <div className='home'>
                {store.chatroomNameList
                    .map(chatroomObj =>
                        <div key={chatroomObj.id}>{chatroomObj.recentMessage}</div>) || <div>empty</div>
                }
                <SettingBar></SettingBar>
            </div>
        )
    }
}


