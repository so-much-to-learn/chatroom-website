import { FastifyInstance } from 'fastify'
import got from 'got'

import config from '../config'

const { 
  github: { clientSecret, clientId, oauthUrl  },
  host,
  allowHosts
} = config

export default function oauth(fastify: FastifyInstance, options, next) {
  // login
  fastify.get('/login', {
    schema: {
      summary: 'Login with Github Account',
      tags: ['oauth'],
      querystring: {
        type: 'object',
        properties: {
          callback_url: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { callback_url = '' } = request.query!
    const { hostname } = new URL(callback_url)
    console.log('request.session', request.session)
    if (callback_url && allowHosts.indexOf(hostname) > -1) {
      request.session.callback_url = callback_url
    } else {
      throw new Error(`callback_url ${callback_url} invalid`)
    }

    const redirect_url = `${host}/api/oauth/redirect`
    reply.redirect(`${oauthUrl}/authorize?client_id=${clientId}&redirect_uri=${redirect_url}`)
  })
  // redirect
  fastify.get('/redirect', {
    schema: {
      summary: 'Login Redirect',
      tags: ['oauth'],
      querystring: {
        type: 'object',
        properties: {
          code: {
            type: 'string'
          }
        }
      }
    }
  }, async (request, reply) => {
    const { code = '' } = request.query!
    if (!code) {
      throw new Error('code invalid')
    }
    try {
      console.time()
      const res = await got.post(
        `${oauthUrl}/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
      )
      .json()
      console.timeEnd()
      const access_token = (res as any).access_token;
      reply.redirect(`${request.session.callback_url}?access_token=${access_token}`)
    } catch (err) {
      throw new Error(`get access_token failed, stack=${err.stack}|message=${err.message}`)
    }
  })
  next()
}