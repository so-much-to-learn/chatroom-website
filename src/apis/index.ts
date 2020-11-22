import fetch from './fetch'
import { AxiosInterceptorManager, AxiosPromise, AxiosResponse } from 'axios'
// import store from '../store'

/**
 * 单个房间的信息
 * @param id
 * @returns {any}
 */
const chatroomInfo = ({ id = 1 } = {}) => fetch({
    method: 'get',
    url: '/chatroom/info',
    data: { id }
})

const chatroomInfoList = (): Promise<IChatroomInfoItem[]> => fetch({
    method: 'get',
    url: '/chatroom/info-list'
})

const userLogin = ({ username, password }: loginQuery = {}): Promise<userInfo> => fetch({
    method: 'post',
    url: '/login',
    data: { username, password }
})

const userRegist = ({ username, password }: loginQuery = {}): Promise<object> => fetch({
    method: 'post',
    url: '/regist',
    data: { username, password }
})

export {
    chatroomInfo,
    chatroomInfoList,
    userLogin,
    userRegist
}
