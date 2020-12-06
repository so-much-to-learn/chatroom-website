import Fastify from 'fastify'
import swagger from 'fastify-swagger'
import swaggerConfig from './utils/swagger'
import Config from './config'
import routes from './routes'

const fastify = Fastify({
  logger: {
    level: 'error',
    prettyPrint: true,
    file: Config.log
  }
})

fastify.register(swagger, swaggerConfig)
fastify.register(routes, {
  prefix: '/api'
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