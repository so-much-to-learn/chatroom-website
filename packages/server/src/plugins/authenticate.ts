import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import cookieParser from 'cookieparser'
import config from '../config'

const authenticate = (fastify: FastifyInstance, opts, next) => {
  fastify.addHook('preParsing', async (request, reply) => {
    const cookie = cookieParser.parse(request.headers.cookie);
    const token = cookie[config.cookieKey];
    if (!token) {
      throw new Error('token invalid.')
    }
    try {
      const user: object = await new Promise((resolve, reject) => {
        fastify.jwt.verify(token, (err, user) => {
          if (err) reject(err)
          resolve(user)
        })
      })
      request.user = user;
    } catch (err) {
      throw err;
    }
  })
  next()
}

export default fp(authenticate, {
  name: 'authenticate'
})