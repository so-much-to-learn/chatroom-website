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
        200: {
          properties: {
            code: {
              type: 'number'
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    avatar_url: {
                      type: 'string'
                    },
                    company: {
                      type: 'string'
                    },
                    created_at: {
                      type: 'string'
                    },
                    email: {
                      type: 'string'
                    },
                    id: {
                      type: 'number'
                    },
                    name: {
                      type: 'string'
                    },
                    location: {
                      type: 'string'
                    },
                    html_url: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
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
        code: 0,
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