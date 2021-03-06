import React, { useRef, useEffect, useContext } from 'react';
import styles from 'components/chattingPanel/index.module.scss';
import { USER_SEND_MESSAGE_RES } from 'constants/browser';
import { ACTIONS, StateContext, DispatchContext } from 'context/index';

const ChattingPanel: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const chattingPanelDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chattingPanelDom.current?.lastElementChild?.scrollIntoView();
  });

  return (
    <div className={styles.container} ref={chattingPanelDom}>
      {state.currentChatroom?.messageList.map((messageItem) => (
        <Message {...messageItem} key={messageItem.messageId} />
      ))}
    </div>
  );
};

const Message: React.FC<IMessageItem> = (props) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { uid, username, message } = props;

  return (
    <div className={uid === state.userInfo.uid ? 'message-item is-me' : 'message-item'}>
      <div className="message-item-username">{username}</div>
      <pre className="message-item-message">{message}</pre>
    </div>
  );
};

export default ChattingPanel;
