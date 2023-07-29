import { type NextFunction, type Request, type Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import { type IUser } from '../interfaces'
import config from '../config'

// Importa a chave secreta JWT e o número de 'salts' do arquivo de configuração.
const jwtSecret = config.secrets.jwt
const salts = config.secrets.salts

// Função assíncrona que compara uma senha com seu hash.
export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash)
}

// Função assíncrona que gera o hash de uma senha.
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, salts)
}

// Função que cria um token JWT com base nas informações do usuário ({ id, username }).
export function createToken({ id, username }: IUser, secret = jwtSecret): string {
  return sign({ id, username }, secret, { expiresIn: '2h' })
}

// Middleware que verifica se um token JWT é válido e decodifica suas informações.
export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined {
  const { authorization } = req.headers

  if (authorization == null) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const token = authorization.replace('Bearer ', '')
    const { id, username } = verify(token, jwtSecret) as IUser

    // Adiciona as informações do usuário decodificadas à propriedade 'user' do objeto de solicitação (Request).
    req.user = { id, username }
    next()
  } catch (e) {
    // Em caso de erro na decodificação do token, retorna uma resposta com status 401 (Não autorizado).
    if (e instanceof Error) console.error(e.stack)
    res.status(401).json({ message: 'Invalid token' })
  }
}
