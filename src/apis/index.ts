import fetch from './fetch'
import { AxiosResponse } from 'axios'
// import store from '../store'

const getChatroomMessage = ({ id = 1 } = {}) => fetch({
    method: 'post',
    url: '/chatroom/messages',
    data: { id }
})

const userLogin = ({ username, password }: loginQuery = {}) => fetch({
    method: 'post',
    url: '/login',
    data: { username, password }
})

export {
    getChatroomMessage,
    userLogin
}
