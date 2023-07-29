import merge from 'lodash.merge'
import prodConfig from './prod'
import localConfig from './local'

// Define a variável de ambiente NODE_ENV com o valor 'development' se não estiver definida.
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

// Define a variável de ambiente stage com o valor 'local' se não estiver definida.
const stage = process.env.STAGE ?? 'local'

let envConfig

// Verifica o estágio atual e atribui a configuração correspondente com base no estágio (localConfig para 'local' ou prodConfig para 'production').
if (stage === 'production') {
  envConfig = prodConfig
} else {
  envConfig = localConfig
}

// Exporta a configuração combinada, que inclui informações como stage, env (NODE_ENV), port, e segredos (jwt, dbUrl e salts).
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
