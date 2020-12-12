import { FastifyInstance } from 'fastify'
export default function(fastify: FastifyInstance, options, next) {

  fastify.get('/login', async function(request, reply) {
    reply.view('/login')
  })

  fastify.get('/callback', async function(request, reply) {
    reply.view('/callback')
  })

  next()
}