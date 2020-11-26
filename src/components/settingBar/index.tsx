import React, { useContext } from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router";
import { Context, ACTIONS } from "context/index";

const SettingBar: React.FC = props => {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: ACTIONS.RESET_USER_INFO });
    history.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className="top-btns">
        <div className="top-btn" onClick={handleLogout} />
        <div className="top-btn" />
        <div className="top-btn" />
      </div>
    </div>
  );
};

export default SettingBar;
