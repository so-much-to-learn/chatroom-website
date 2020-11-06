import fetch from './fetch'
import { AxiosInterceptorManager, AxiosPromise, AxiosResponse } from 'axios'
// import store from '../store'

const getChatroomMessage = ({ id = 1 } = {}) => fetch({
    method: 'post',
    url: '/chatroom/messages',
    data: { id }
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
    getChatroomMessage,
    userLogin,
    userRegist
}
