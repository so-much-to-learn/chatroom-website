import React, { useEffect, useState, useContext, useMemo, useCallback, useRef } from 'react';
import styles from './index.module.scss';
import { ACTIONS, Context } from 'context/index';
import * as Api from 'apis';
import { USER_SEND_MESSAGE_RES } from 'constants/browser';
import * as Utils from 'utils';

interface newMessageObj {
  chatroomId: number | null;
  newMessage: IMessageItem | null;
}

const ChatroomList: React.FC = () => {
  const { state, dispatch } = useContext(Context);

  const handleChangeChatroom = useCallback((id: number) => {
    dispatch({ type: ACTIONS.CHANGE_CHATROOM, payload: { chatroomId: id } });
  }, []);

  useEffect(() => {
    Api.chatroomInfoList().then((chatroomInfoList) => {
      dispatch({
        type: ACTIONS.CHATROOM_INFO_LIST,
        payload: {
          chatroomInfoList,
          currentChatroom: chatroomInfoList.length ? chatroomInfoList[0] : null,
        },
      });
    });
  }, []);

  useEffect(() => {
    state.socket.on(USER_SEND_MESSAGE_RES, ({ chatroomId, newMessage }: newMessageObj) => {
      dispatch({ type: ACTIONS.NEW_MESSAGE, payload: { chatroomId, newMessage } });
    });
  }, []);

  // 左侧群列表信息
  const chatroomNameListMemo: IChatroomNameItem[] = useMemo(() => {
    return state.chatroomInfoList?.map((T) => {
      const lastMessage = T.messageList.slice(-1)[0];
      return {
        id: T.id,
        name: T.name,
        recentMessage: lastMessage?.message,
        recentMessageUsername: lastMessage?.username,
      };
    });
  }, [state.chatroomInfoList]);

  return (
    <div className={styles.container}>
      {chatroomNameListMemo?.length
        ? chatroomNameListMemo.map((chatroomObj: IChatroomNameItem) => (
            <ChatroomItem
              {...chatroomObj}
              key={chatroomObj.id}
              handleChangeChatroom={handleChangeChatroom}
              currentChatroomId={state.currentChatroom?.id}
            />
          ))
        : '正在请求房间列表'}
    </div>
  );
};

const ChatroomItem: React.FC<IChatroomNameItem & {
  currentChatroomId: number | undefined;
  handleChangeChatroom: Function;
}> = React.memo((props) => {
  const {
    name,
    recentMessage,
    id,
    recentMessageUsername,
    currentChatroomId,
    handleChangeChatroom,
  } = props;
  const handleChangeChatroomItem = () => handleChangeChatroom(id);

  return (
    <div
      className={`${styles.chatroomItem} ${id === currentChatroomId ? styles['is-active'] : ''}`}
      onClick={handleChangeChatroomItem}
    >
      <div className={styles.header}>{name}</div>
      <div className={styles.content}>
        {recentMessageUsername}： {recentMessage}
      </div>
    </div>
  );
});

export default ChatroomList;
