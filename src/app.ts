import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { router } from './router'
import { verifyToken } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import { errorHandler } from './modules/errorHandler'

// Cria uma instância do aplicativo Express.
const app: express.Express = express()

// Adiciona o middleware 'cors' para permitir requisições de diferentes origens (Cross-Origin Resource Sharing).
app.use(cors())

// Adiciona o middleware 'morgan' com o formato 'dev' para registrar detalhes das requisições no console durante o desenvolvimento.
app.use(morgan('dev'))

// Adiciona o middleware 'express.json()' para permitir o parse do corpo de requisições com formato JSON.
app.use(express.json())

// Adiciona o middleware 'express.urlencoded()' para permitir o parse de corpos de requisições codificados com x-www-form-urlencoded.
app.use(express.urlencoded({ extended: true }))

// Rota principal que responde com uma mensagem JSON "Hello, World!" quando acessada via método GET.
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello, World!' })
})

// Rota '/api' que é protegida pelo middleware 'verifyToken' e roteia as requisições para o roteador 'router'.
app.use('/api', verifyToken, router)

// Rota para criar um novo usuário via método POST, usando o middleware 'createNewUser'.
app.post('/user', (req, res, next) => {
  void createNewUser(req, res, next)
})

// Rota para fazer login (signIn) via método POST, usando o middleware 'signIn'.
app.post('/signin', (req, res, next) => {
  void signIn(req, res, next)
})

// Middleware 'errorHandler' para tratar erros.
app.use(errorHandler)

// Exporta a instância do aplicativo configurada para uso em outros módulos.
export { app }
