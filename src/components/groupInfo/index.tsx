import React, { useContext } from 'react';
import styles from './index.module.scss';
import { ACTIONS, StateContext } from 'context/index';

const GroupInfo: React.FC = (props) => {
  const state = useContext(StateContext);

  return <div className={styles.container}>{state.currentChatroom?.name}</div>;
};

export default GroupInfo;
