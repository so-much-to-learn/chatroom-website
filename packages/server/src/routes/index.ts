import { FastifyInstance } from 'fastify'
import session from 'fastify-session'
import cookie from 'fastify-cookie'

import group from './group'
import user from './user'
import oauth from './oauth'

export default function(fastify: FastifyInstance, options, next) {
  // 注册 session 和 cookie
  fastify.register(cookie)
  fastify.register(session, {
    secret: 'a secret with minimum length of 32 characters',
    cookie: { secure: false },
  })

  fastify.register(group, {
    prefix: '/group'
  })
  fastify.register(user, {
    prefix: '/user'
  })
  fastify.register(oauth, {
    prefix: '/oauth'
  })
  next()
}