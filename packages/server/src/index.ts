import Fastify from 'fastify'
import swagger from 'fastify-swagger'
import session from 'fastify-session'
import cookie from 'fastify-cookie'
import view from 'point-of-view'
import path from 'path'

import swaggerConfig from './utils/swagger'
import Config from './config'
import routes from './routes'
import test from './__test__'

const fastify = Fastify({
  logger: {
    level: 'error',
    prettyPrint: true,
    file: Config.log
  }
})

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

// 注册 session 和 cookie
fastify.register(cookie)
fastify.register(session, {
  secret: '2132qewdeqwdeqwwefqqweqwdsadasdaqwdeqwdqddasa'
})
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