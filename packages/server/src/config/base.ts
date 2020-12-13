export default {
  log: '/root/chatroom.error.log',
  host: 'http://chatroom.gyyin.top',
  allowHosts: ['localhost'],
  github: {
    oauthUrl: 'https://github.com/login/oauth',
    apiUrl: 'https://api.github.com',
    clientSecret: '7e78d86daed2b3b545506db0cdceb12fe2feea1f',
    clientId: 'd4175d934ba8f62400db'
  },
  jwtSecret: '3e4420f2-f33e-479c-879d-295a61ccadec',
  sessionSecret: 'db542338-1b01-4743-8ab7-d794032f7bf1',
  env: {
    isDev: true,
    isSecure: false
  },
  cookieKey: 'a-token'
}