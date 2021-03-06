import React from 'react';
import { USER_INFO } from 'constants/browser';
import ImCore from 'im-core';
import { BaseURL } from 'constants/server';
import * as Utils from 'utils';

declare interface IContextType {
  imCore: ImCore | null;
  userInfo: userInfo;
  chatroomInfoList: IChatroomInfoItem[];
  currentChatroom: IChatroomInfoItem | null;
}

const userInfoBefore: string | null = sessionStorage.getItem(USER_INFO);

export const initContextValue: IContextType = {
  chatroomInfoList: [],
  currentChatroom: null,
  userInfo: JSON.parse(userInfoBefore ?? '{}'),
  imCore: userInfoBefore && new ImCore(BaseURL, JSON.parse(userInfoBefore)),
};

// Actions
const RESET_USER_INFO = 'RESET_USER_INFO';
const CHANGE_CHATROOM = 'CHANGE_CHATROOM';
const CHATROOM_INFO_LIST = 'CHATROOM_INFO_LIST';
const USER_LOGIN = 'USER_LOGIN';
const NEW_MESSAGE = 'NEW_MESSAGE';

export const ACTIONS = {
  RESET_USER_INFO,
  CHANGE_CHATROOM,
  CHATROOM_INFO_LIST,
  USER_LOGIN,
  NEW_MESSAGE,
};

export const reducer: React.Reducer<IContextType, IAction> = (
  state: IContextType,
  action: IAction,
): IContextType => {
  // console.log('reducer: ', state, action)
  switch (action.type) {
    case ACTIONS.RESET_USER_INFO:
      sessionStorage.removeItem(USER_INFO);
      return { ...state, userInfo: { uid: null, username: null } };
    case ACTIONS.CHANGE_CHATROOM:
      const newChatroom =
        state.chatroomInfoList.find((T) => T.id === action.payload.receiverId) ?? null;
      return { ...state, currentChatroom: newChatroom };
    case ACTIONS.CHATROOM_INFO_LIST: {
      return { ...state, ...action.payload };
    }
    case ACTIONS.NEW_MESSAGE: {
      const { chatroomInfoList, currentChatroom } = state;
      const { receiverId, newMessage } = action.payload;
      const chatroom = chatroomInfoList.find((chatroom) => chatroom.id === receiverId);
      if (!chatroom || !currentChatroom) return state;
      const otherChatroomList = Utils.removeItemInArray<IChatroomInfoItem>(
        chatroomInfoList,
        chatroom,
      );
      const newChatroomInfo = {
        ...chatroom,
        messageList: [...chatroom!.messageList, newMessage],
      };
      return currentChatroom.id === receiverId
        ? {
          ...state,
          chatroomInfoList: [newChatroomInfo, ...otherChatroomList],
          currentChatroom: newChatroomInfo,
        }
        : { ...state, chatroomInfoList: [newChatroomInfo, ...otherChatroomList] };
    }
    case ACTIONS.USER_LOGIN: {
      const { userInfo } = action.payload;
      userInfo && sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo));
      return { ...state, userInfo, imCore: new ImCore(BaseURL, userInfo) };
    }
    default:
      return state;
  }
};

export const StateContext = React.createContext<IContextType>(initContextValue);
export const DispatchContext = React.createContext<React.Dispatch<IAction>>(() => {
});
