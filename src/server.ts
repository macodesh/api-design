// Importa o módulo 'dotenv' para carregar variáveis de ambiente a partir do arquivo .env.
import * as dotenv from 'dotenv'
import { app } from './app'
import config from './config'

// Carrega as variáveis de ambiente do arquivo .env para process.env.
dotenv.config()

// Inicia o servidor Express para ouvir em uma porta específica definida em 'config.port'.
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}!`)
})
