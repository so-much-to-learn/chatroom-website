import { FastifyInstance } from 'fastify'
import got from 'got'
import config from '../config'

const { github: { apiUrl } } = config
export default function(fastify: FastifyInstance, options, next) {

  fastify.get('/info', {
    schema: {
      summary: 'User with Github Account',
      tags: ['user'],
      querystring: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string'
          }
        }
      },
      response: {
        
      }
    }
  }, async function(request, reply) {
    const { access_token } = request.query!
    try {
      const res = await got(`${apiUrl}/user`, {
        responseType: 'json',
        headers: {
          accept: 'application/json',
          Authorization: `token ${access_token}`
        }
      })
      const user = res.body
      reply.send({
        data: {
          user
        }
      })
    } catch (err) {
      throw new Error(`get user info failed, err.stack=${err.stack}|err.message=${err.message}`)
    }
  })

  next()
}