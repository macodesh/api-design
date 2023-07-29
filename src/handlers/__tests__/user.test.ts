import { type Request, type Response } from 'express'
// Importa o módulo 'user' para testar o manipulador 'createNewUser'.
import * as user from '../user'

// Descreve o grupo de testes para o manipulador 'createNewUser'.
describe.skip('The user handler', () => {
  // Testa a criação de um novo usuário.
  it('should create a new user', async () => {
    // Cria um objeto de requisição com os dados necessários para criar um novo usuário.
    const req = {
      body: {
        username: 'test',
        password: 'test'
      }
    }

    // Cria um objeto de resposta simulado que contém a função 'json' para verificar a resposta do manipulador.
    const res = {
      json({ token }: { token: string }) {
        // Verifica se a resposta do manipulador inclui um token de autenticação válido.
        expect(token).toBeDefined()
      }
    }

    // Chama o manipulador 'createNewUser' com a requisição e a resposta simulada, e utiliza uma função vazia como middleware 'next'.
    // O 'await' é usado porque a função 'createNewUser' é assíncrona (retorna uma Promise).
    await user.createNewUser(req as Request, res as Response, () => {})
  })
})
