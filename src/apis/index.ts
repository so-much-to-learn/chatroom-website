import fetch from './fetch'
// import store from '../store'

const getChatroomMessage = ({ id = 1 } = {}) => fetch({
  method: 'post',
  url: '/agv/task/cancelTask',
  data: { id }
})

export {
  getChatroomMessage
}
