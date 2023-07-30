import path from 'path'
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
import { createServer } from 'livereload'
import connectLivereload from 'connect-livereload'
import { router } from './api/router'
import { verifyToken } from './api/modules/auth'
import { createNewUser, signIn } from './api/handlers/user'
import { errorHandler } from './api/modules/errorHandler'
import { validateUserInput } from './api/modules/validations'

const liveReloadServer = createServer()
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/')
  }, 10)
})

// Cria uma instância do aplicativo Express.
const app: Express = express()

// Configurar a view engine para usar o Pug.
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Middleware para servir arquivos estáticos na pasta 'public'.
// eslint-disable-next-line import/no-named-as-default-member
app.use(express.static(path.join(__dirname, '../public')))

app.use(connectLivereload())

// Adiciona o middleware 'cors' para permitir requisições de diferentes origens (Cross-Origin Resource Sharing).
app.use(cors())

// Adiciona o middleware 'morgan' com o formato 'dev' para registrar detalhes das requisições no console durante o desenvolvimento.
app.use(morgan('dev'))

// Adiciona o middleware 'express.json()' para permitir o parse do corpo de requisições com formato JSON.
app.use(json())

// Adiciona o middleware 'express.urlencoded()' para permitir o parse de corpos de requisições codificados com x-www-form-urlencoded.
app.use(urlencoded({ extended: true }))

// Rota para a página inicial.
app.get('/', (_req, res) => {
  res.render('index', { title: 'Home' })
})

// Rota principal que responde com uma mensagem JSON "Hello, World!" quando acessada via método GET.
app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello, World!' })
})

// Rota para criar um novo usuário via método POST, usando o middleware 'createNewUser'.
app.post(
  '/api/signup',
  validateUserInput,
  (req: Request, res: Response, next: NextFunction) => {
    void createNewUser(req, res, next)
  }
)

// Rota para fazer login (signIn) via método POST, usando o middleware 'signIn'.
app.post(
  '/api/signin',
  validateUserInput,
  (req: Request, res: Response, next: NextFunction) => {
    void signIn(req, res, next)
  }
)

// Rota '/api' que é protegida pelo middleware 'verifyToken' e roteia as requisições para o roteador 'router'.
app.use('/api', verifyToken, router)

// Middleware 'errorHandler' para tratar erros.
app.use(errorHandler)

// Exporta a instância do aplicativo configurada para uso em outros módulos.
export { app }
