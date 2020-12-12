import { FastifyInstance } from 'fastify'
export default function(fastify: FastifyInstance, options, next) {

  fastify.get('/login', async function(request, reply) {
    reply.view('/login.ejs')
  })

  fastify.get('/callback', async function(request, reply) {
    reply.view('/callback.ejs')
  })

  next()
}