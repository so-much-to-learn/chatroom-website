import { FastifyInstance } from 'fastify'
import group from './group'
import user from './user'

export default function(fastify: FastifyInstance, options, next) {
  fastify.register(group, {
    prefix: '/group'
  })
  fastify.register(user, {
    prefix: '/user'
  })
  next()
}