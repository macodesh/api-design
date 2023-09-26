import { type ErrorRequestHandler } from 'express'
import config from '../../config'

/*
 * Middleware de tratamento de erros
 * A função errorHandler é um middleware que verifica se há erros
 * e retorna uma resposta com status 500 e uma mensagem de erro útil para depuração.
 * Se a variável de ambiente for diferente de 'development',
 * uma mensagem de erro genérica (e mais amigável) é retornada.
 */

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (config.env === 'development') {
    res.status(500).json({ error: err.stack })
  } else {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default errorHandler
