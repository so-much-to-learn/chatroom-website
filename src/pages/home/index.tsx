import React, { Component, useRef, useContext, useEffect } from "react";
import SettingBar from "components/settingBar/index";
import ChatroomList from "components/chatroomList";
import GroupInfo from "components/groupInfo";
import ChattingPanel from "components/chattingPanel";
import TypewritingPanel from "components/typewritingPanel";
import { useHistory } from "react-router";
import styles from "./index.module.scss";
import { USER_SEND_MESSAGE_RES } from "constants/browser";
import { Context, ACTIONS } from "context/index";

const Home: React.FC = props => {
  const { state } = useContext(Context);
  const soundRef = useRef<HTMLAudioElement>(null);
  const history = useHistory();

  if (!state.userInfo?.uid) {
    history.push("/login");
  }

  useEffect(() => {
    state.socket.on(USER_SEND_MESSAGE_RES, () => {
      soundRef.current?.play();
    });
  }, []);

  return (
    <div className={styles.home}>
      <audio id="my-message-sound" ref={soundRef}>
        <source
          src="https://cdn.jsdelivr.net/gh/SHERlocked93/pic@master/new-message.mp3"
          type="audio/mpeg"
        />
      </audio>
      <div className={styles.container}>
        <SettingBar />
        <ChatroomList />
        {state.currentChatroom ? (
          <div className={styles.room}>
            <GroupInfo />
            <ChattingPanel />
            <TypewritingPanel />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Home;
