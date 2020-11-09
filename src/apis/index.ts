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

const chatroomInfoList = () => fetch<IChatroomInfoItem[]>({
    method: 'get',
    url: '/chatroom/info-list'
})

const userLogin = ({ username, password }: loginQuery = {}) => fetch<userInfo>({
    method: 'post',
    url: '/login',
    data: { username, password }
})

const userRegist = ({ username, password }: loginQuery = {}) => fetch<object>({
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
