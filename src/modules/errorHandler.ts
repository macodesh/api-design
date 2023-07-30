import { type ErrorRequestHandler } from 'express'

// Middleware de tratamento de erros personalizado.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Imprime o erro no console para fins de registro.
  console.error(err)

  // Verifica o tipo de erro e retorna a resposta HTTP apropriada com uma mensagem JSON.
  if (err.type === 'auth') {
    // Erro de autenticação (token inválido ou não fornecido), retorna 401 (Não autorizado).
    res.status(401).json({ message: 'Unauthorized' })
  } else if (err.type === 'input') {
    // Erro de entrada (dados inválidos), retorna 400 (Solicitação inválida).
    res.status(400).json({ message: 'Bad request' })
  } else {
    // Outro tipo de erro, retorna 500 (Erro interno do servidor).
    res.status(500).json({ message: 'Internal server error' })
  }
}
