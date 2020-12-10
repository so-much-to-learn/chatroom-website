import React, { useRef, useContext, useEffect } from 'react';
import SettingBar from 'components/settingBar/index';
import ChatroomList from 'components/chatroomList';
import GroupInfo from 'components/groupInfo';
import ChattingPanel from 'components/chattingPanel';
import TypewritingPanel from 'components/typewritingPanel';
import { useHistory } from 'react-router';
import styles from './index.module.scss';
import { StateContext } from 'context/index';

const Home: React.FC = () => {
  const state = useContext(StateContext);
  const soundRef = useRef<HTMLAudioElement>(null);
  const souncRefCb = useRef(() => {
    soundRef.current?.play();
  });
  const history = useHistory();

  if (!state.userInfo?.uid) {
    history.push('/login');
  }

  useEffect(() => {
    state.imCore.subChannel('OtherSendMessage', souncRefCb.current);
    return () => {
      state.imCore.unsubChannle('OtherSendMessage', souncRefCb.current);
    };
  }, []);

  return (
    <div className={ styles.home }>
      <audio id='my-message-sound' ref={ soundRef }>
        <source src='https://cdn.jsdelivr.net/gh/SHERlocked93/pic@master/new-message.mp3'
                type='audio/mpeg' />
      </audio>
      <div className={ styles.container }>
        <SettingBar />
        <ChatroomList />
        { state.currentChatroom ? (
          <div className={ styles.room }>
            <GroupInfo />
            <ChattingPanel />
            <TypewritingPanel />
          </div>
        ) : (
          <div />
        ) }
      </div>
    </div>
  );
};

export default Home;
