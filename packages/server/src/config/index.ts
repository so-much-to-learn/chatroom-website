import dev from './dev'
import prod from './prod'

const env = process.env.NODE_ENV

let config = prod;

if (env === 'dev') {
  config = dev
}

export default config