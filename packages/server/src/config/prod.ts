import base from './base'

export default {
  ...base,
  allowHosts: ['chatroom.gyyin.top'],
  env: {
    isDev: false,
    isSecure: true
  }
}