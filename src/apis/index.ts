import fetch from './fetch'
import { AxiosInterceptorManager, AxiosPromise, AxiosResponse } from 'axios'
// import store from '../store'

const getChatroomMessage = ({ id = 1 } = {}) => fetch({
    method: 'post',
    url: '/chatroom/messages',
    data: { id }
})

const userLogin = ({ username, password }: loginQuery = {}): Promise<userInfo> => fetch({
    method: 'post',
    url: '/login',
    data: { username, password }
})

export {
    getChatroomMessage,
    userLogin
}
