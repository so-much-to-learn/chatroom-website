import React, { useEffect, useMemo, useReducer } from 'react'
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

type  MyCreateContext = IContextType & { chatroomNameListMemo: IChatroomNameItem[] }

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

const Context = React.createContext<{ state: MyCreateContext, dispatch: React.Dispatch<IAction> } | null>(null)

const reducer: React.Reducer<IContextType, IAction> = (state: IContextType, action: IAction) => {
    console.log(state, action)
    switch (action.type) {
        case 'RESET_USER_INFO':
            return { ...state, ...resetUserInfo() }
        case 'CHANGE_CHATROOM':
            return { ...state, ...changeChatroom(action.payload, state) }
        case 'GET_CHATROOM_INFO_LIST':
            return { ...state, ...getChatroomInfoList() }
        case 'USER_LOGIN':
            return { ...state, ...userLogin(action.payload) }
        case  USER_SEND_MESSAGE_RES:
            return { ...state, ...action.payload }
        case 'ADD_MESSAGE':
            addMessage(action.payload, state)
        // eslint-disable-next-line no-fallthrough
        default:
            return state
    }
}

// 清空用户信息
const resetUserInfo = (): { userInfo: userInfo } => {
    sessionStorage.removeItem(USER_INFO)
    return { userInfo: { uid: null, username: null } }
}

// 用户在群组发送消息
const addMessage = ({ chatroomId, messageObj }: { chatroomId: number, messageObj: IMessageItemRequest }, state: IContextType): void => {
    state.socket.emit(USER_SEND_MESSAGE, { chatroomId, messageObj })
}

// 获取群list信息
const getChatroomInfoList = async(): Promise<{ chatroomInfoList: IChatroomInfoItem[] }> => {
    return { chatroomInfoList: await Api.chatroomInfoList() }
}

// 用户登录
const userLogin = async({ username, password }: loginQuery = {}): Promise<{ userInfo: userInfo }> => {
    const userInfo = await Api.userLogin({ username, password })
    userInfo && sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo))
    return { userInfo }
}

// 切换群
const changeChatroom = ({ chatroomId }: { chatroomId: number }, state: IContextType): { currentChatroom: IChatroomInfoItem | null } => {
    return { currentChatroom: state.chatroomInfoList.find((T: IChatroomInfoItem) => T.id === chatroomId) || null }
}

// 获取保存在sessionStorage中的用户信息，刷新页面的时候不需要重新登录
const initUserInfo = (initContextValue: IContextType) => {
    console.log({ initContextValue }, '  in initUserInfo!')
    const value = sessionStorage.getItem(USER_INFO)
    return { ...initContextValue, userInfo: value ? JSON.parse(value) : value }
}

const ContextProvider = (props: { children: React.ReactNode }): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initContextValue, initUserInfo)
    useEffect(() => {
        state.socket.on(USER_SEND_MESSAGE_RES, ({ chatroomId, newMessage }: { chatroomId: number, newMessage: IMessageItem }) => {
            dispatch({
                type: USER_SEND_MESSAGE_RES,
                payload: { chatroomInfoList: state.chatroomInfoList.find(chatroom => chatroom.id === chatroomId)?.messageList.push(newMessage) }
            })
        })
    }, [])

    // 计算属性： 获取左侧群列表信息
    const chatroomNameListMemo: IChatroomNameItem[] = useMemo(() => state.chatroomInfoList.map(T => {
        const lastMessage = T.messageList.slice(-1)[0]
        return ({
            id: T.id,
            name: T.name,
            recentMessage: lastMessage?.message,
            recentMessageUsername: lastMessage?.username
        })
    }), [state.chatroomInfoList])
    return <Context.Provider value={ { state: { ...state, chatroomNameListMemo }, dispatch } }>
        { props.children }</Context.Provider>
}

export { Context, ContextProvider }
