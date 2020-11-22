import React, { useReducer } from 'react'
import { action, computed, observable } from 'mobx'
import * as Api from 'apis'
import { USER_INFO, USER_SEND_MESSAGE, USER_SEND_MESSAGE_RES } from 'constants/browser'
import { io, Socket } from 'socket.io-client'
import { BaseURL } from 'constants/server'

interface IAction {
    type: string
    payload: any    // todo: 完善payload类型
}

declare interface IContextType {
    socket: Socket,
    chatroomNameList: IChatroomNameItem[],
    userInfo: userInfo,
    chatroomInfoList: IChatroomInfoItem[],
    currentChatroom: IChatroomInfoItem | null,
}

const initContextValue: IContextType = {
    chatroomNameList: [],
    chatroomInfoList: [],
    currentChatroom: null,
    userInfo: {
        uid: null,
        username: null
    },
    socket: io(BaseURL, { transports: ['websocket', 'xhr-polling', 'jsonp-polling'] })
}

const Context = React.createContext<{ state: IContextType, dispatch: React.Dispatch<IAction> } | null>(null)

const resetUserInfo = (): { userInfo: userInfo } => {
    sessionStorage.removeItem(USER_INFO)
    return { userInfo: { uid: null, username: null } }
}

const reducer: React.Reducer<IContextType, IAction> = (state: IContextType, action: IAction) => {
    console.log(state, action)
    switch (action.type) {
        case 'RESET_USER_INFO':
            return { ...state, ...resetUserInfo() }
        default:
            return state
    }
}

const initUserInfo = (initContextValue: IContextType) => {
    console.log({ initContextValue })
    const value = sessionStorage.getItem(USER_INFO)
    return { ...initContextValue, userInfo: value ? JSON.parse(value) : value }
}

const ContextProvider = (props: { children: React.ReactNode }): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initContextValue, initUserInfo)
    return <Context.Provider value={ { state, dispatch } }>{ props.children }</Context.Provider>
}

export { Context, ContextProvider }
