import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import styles from './index.module.scss';
import { ACTIONS, DispatchContext, StateContext } from 'context/index';
import * as Api from 'apis';
import * as Utils from 'utils';

interface newMessageObj {
  receiverId: number | null;
  newMessage: IMessageItem | null;
}

const ChatroomList: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [chatroomNameList, setChatroomNameList] = useState<IChatroomNameItem[]>([]);
  const receiveRefCb = useRef(({ receiverId, newMessage }: newMessageObj) => {
    dispatch({ type: ACTIONS.NEW_MESSAGE, payload: { receiverId, newMessage } });
  });

  const handleChangeChatroom = useCallback((id: number) => {
    dispatch({ type: ACTIONS.CHANGE_CHATROOM, payload: { receiverId: id } });
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
    state.imCore.subChannel('OtherSendMessage', receiveRefCb.current);
    return () => {
      state.imCore.unsubChannle('OtherSendMessage', receiveRefCb.current);
    };
  }, []);

  // 左侧群列表信息
  useEffect(() => {
    setChatroomNameList(state.chatroomInfoList?.map((T) => {
      const lastMessage = T.messageList.slice(-1)[0];
      return {
        id: T.id,
        name: T.name,
        recentMessage: lastMessage?.message,
        recentMessageUsername: lastMessage?.username,
      };
    }));
  }, [state.chatroomInfoList]);

  return (
    <div className={ styles.container }>
      { chatroomNameList?.length
        ? chatroomNameList.map((chatroomObj: IChatroomNameItem) => (
          <ChatroomItem
            { ...chatroomObj }
            key={ chatroomObj.id }
            handleChangeChatroom={ handleChangeChatroom }
            isActive={ state.currentChatroom?.id === chatroomObj.id }
          />
        ))
        : '正在请求房间列表' }
    </div>
  );
};

const ChatroomItem: React.FC<IChatroomNameItem & {
  isActive: boolean;
  handleChangeChatroom: Function;
}> = React.memo((props) => {
  const {
    name,
    recentMessage,
    id,
    recentMessageUsername,
    isActive,
    handleChangeChatroom,
  } = props;
  const handleChangeChatroomItem = () => handleChangeChatroom(id);

  return (
    <div
      className={ `${ styles.chatroomItem } ${ isActive ? styles['is-active'] : '' }` }
      onClick={ handleChangeChatroomItem }
    >
      <div className={ styles.header }>{ name }</div>
      <div className={ styles.content }>
        { recentMessageUsername }： { recentMessage }
      </div>
    </div>
  );
});

export default ChatroomList;
