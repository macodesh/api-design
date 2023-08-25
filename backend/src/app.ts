import express, {
  type Express,
  json,
  type NextFunction,
  type Request,
  type Response,
  urlencoded
} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routers/router'
import { verifyToken } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import errorHandler from './modules/error/errorHandler'
import { validateUserInput } from './modules/validations'

const app: Express = express()

// Middlewares

app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: true }))

// Rotas

// Rota de teste
app.get('/api', (_req, res) => {
  res.status(200).json({ data: 'Hello, World!' })
})

// Rota de cadastro de conta
app.post(
  '/api/signup',
  validateUserInput,
  (req: Request, res: Response, next: NextFunction) => {
    void createNewUser(req, res, next)
  }
)

// Rota de login
app.post(
  '/api/signin',
  validateUserInput,
  (req: Request, res: Response, next: NextFunction) => {
    void signIn(req, res, next)
  }
)

// Rotas protegidas por autenticação
app.use('/api', verifyToken, router)

// Middleware de tratamento de erros
app.use(errorHandler)

export default app
