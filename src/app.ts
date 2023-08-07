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
import { router } from './router'
import { verifyToken } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import { errorHandler } from './modules/error/errorHandler'
import { validateUserInput } from './modules/validations'

const app: Express = express()

app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello, World!' })
})

app.post(
  '/api/signup',
  validateUserInput,
  (req: Request, res: Response, next: NextFunction) => {
    void createNewUser(req, res, next)
  }
)

app.post(
  '/api/signin',
  validateUserInput,
  (req: Request, res: Response, next: NextFunction) => {
    void signIn(req, res, next)
  }
)

app.use('/api', verifyToken, router)
app.use(errorHandler)

export { app }
