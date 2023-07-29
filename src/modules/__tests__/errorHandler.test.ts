import { type Response } from 'express'
import { errorHandler } from '../errorHandler'

describe.skip('errorHandler', () => {
  // Variável para armazenar o objeto com os mocks das funções 'status' e 'json'.
  let mockedResponse: any
  // Variável para simular um objeto de requisição (não está sendo utilizado nos testes).
  let req: any
  // Variável para simular o middleware 'next' (não está sendo utilizado nos testes).
  let next: any

  beforeEach(() => {
    mockedResponse = {
      // Cria uma função mock para 'status' que retorna o próprio objeto (encadeamento de chamadas).
      status: jest.fn().mockReturnThis(),
      // Cria uma função mock para 'json'.
      json: jest.fn()
    }
  })

  afterEach(() => {
    // Limpa todos os mocks criados antes de cada teste.
    jest.clearAllMocks()
  })

  it('should return 401 status code and "Unauthorized" message when error type is "auth"', () => {
    // Define um erro simulado com tipo 'auth'.
    const error = { type: 'auth' }
    // Chama a função errorHandler com o erro simulado e os objetos simulados de requisição e resposta.
    errorHandler(error, req, mockedResponse as Response, next)

    // Verifica se a função 'status' foi chamada com o código de status 401.
    expect(mockedResponse.status).toHaveBeenCalledWith(401)
    // Verifica se a função 'json' foi chamada com o objeto contendo a mensagem "Unauthorized".
    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: 'Unauthorized'
    })
  })

  it('should return 400 status code and "Bad request" message when error type is "input"', () => {
    // Define um erro simulado com tipo 'input'.
    const error = { type: 'input' }
    // Chama a função errorHandler com o erro simulado e os objetos simulados de requisição e resposta.
    errorHandler(error, req, mockedResponse as Response, next)

    // Verifica se a função 'status' foi chamada com o código de status 400.
    expect(mockedResponse.status).toHaveBeenCalledWith(400)
    // Verifica se a função 'json' foi chamada com o objeto contendo a mensagem "Bad request".
    expect(mockedResponse.json).toHaveBeenCalledWith({ message: 'Bad request' })
  })

  it('should return 500 status code and "Internal server error" message for any other type of error', () => {
    // Define um erro simulado com um tipo desconhecido.
    const error = { type: 'unknown' }
    // Chama a função errorHandler com o erro simulado e os objetos simulados de requisição e resposta.
    errorHandler(error, req, mockedResponse as Response, next)

    // Verifica se a função 'status' foi chamada com o código de status 500.
    expect(mockedResponse.status).toHaveBeenCalledWith(500)
    // Verifica se a função 'json' foi chamada com o objeto contendo a mensagem "Internal server error".
    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: 'Internal server error'
    })
  })
})
