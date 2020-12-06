import { FastifyInstance } from 'fastify'

export default function(fastify: FastifyInstance, options, next) {
  fastify.addHook('preValidation', function(request, reply) {
    
  })
  fastify.post('/login', function(request, reply) {

  })
  fastify.post('/register', function(request, reply))
}