import Fastify from 'fastify'
import swagger from 'fastify-swagger'
import session from 'fastify-session'
import cookie from 'fastify-cookie'
import jwt from 'fastify-jwt'
import view from 'point-of-view'
import path from 'path'

import swaggerConfig from './utils/swagger'
import config from './config'
import routes from './routes'
import test from './__test__'

const env = process.env.NODE_ENV
const { env: { isDev, isSecure }, log, sessionSecret, jwtSecret } = config

const fastify = Fastify({
  logger: {
    level: 'error',
    prettyPrint: true,
    file: log
  }
})

// 注册 session 和 cookie
fastify.register(cookie)
fastify.register(session, {
  secret: sessionSecret,
  cookie: { secure: isSecure }
})

fastify.register(jwt, {
  secret: jwtSecret
})

console.log('NODE_ENV', env)

if (isDev) {
  // ejs 做测试页面用
  fastify.register(view, {
    engine: {
      ejs: require('ejs')
    },
    root: path.join(__dirname, '__test__/views'),
  })
  fastify.register(test, {
    prefix: '/test'
  })
}

fastify.register(swagger, swaggerConfig)

fastify.register(routes, {
  prefix: '/api'
})

fastify.ready((err) => {
  if (err) throw err
  fastify.swagger()
})

process.on('uncaughtException', err => {
  console.trace('uncaughtException happened', err);
  setTimeout(() => {
    process.exit(1); //mandatory (as per the Node docs)
  }, 100);
});

fastify.listen(3000, function(error) {
  if (error) throw error;
  console.log('server is running on port 3000.')
})