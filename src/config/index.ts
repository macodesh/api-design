import merge from 'lodash.merge'
import prodConfig from './prod'
import localConfig from './local'

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

const stage = process.env.STAGE ?? 'local'
let envConfig

if (stage === 'production') {
  envConfig = prodConfig
} else {
  envConfig = localConfig
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT ?? 3001,
    secrets: {
      jwt: process.env.JWT_SECRET ?? 'secret',
      dbUrl: process.env.DATABASE_URL,
      salts: process.env.BCRYPT_SALTS ?? 10
    }
  },
  envConfig
)
