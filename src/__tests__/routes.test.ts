import supertest from 'supertest'

import { app } from '../app'

// Descreve o grupo de testes para a rota GET '/'.
describe('GET /', () => {
  // Testa a rota GET '/'.
  it('should return 200 and message: "Hello, World!"', async () => {
    // Faz uma requisição GET para a rota '/' usando a biblioteca supertest, que permite fazer solicitações HTTP para o aplicativo.
    const res = await supertest(app).get('/')

    // Verifica se a resposta possui o status 200 (OK).
    expect(res.status).toBe(200)

    // Verifica se o corpo da resposta contém a propriedade 'message' com o valor "Hello, World!".
    expect(res.body.message).toBe('Hello, World!')
  })
})
