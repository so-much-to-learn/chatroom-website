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
      const user = res.body;
      const token = fastify.jwt.sign({ user })
      reply
        .setCookie(config.cookieKey, token, {
          domain: config.host,
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
          httpOnly: true,
          secure: config.env.isSecure,
          path: '/'
        })
        .send({
          code: 0,
          data: {
            user
          }
        })
    } catch (err) {
      request.log.error(`[/user/info] error.message=${err.message}`)
      throw new Error(`get user info failed, err.stack=${err.stack}|err.message=${err.message}`)
    }
  })

  next()
}