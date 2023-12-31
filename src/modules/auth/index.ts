import { type NextFunction, type Request, type Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import { type IUser } from '../../interfaces'
import config from '../../config'

const jwtSecret = config.secrets.jwt
const salts = config.secrets.salts

/*
 * Funções de autenticação
 * A função comparePasswords compara uma senha em texto plano com uma senha "hasheada"
 * e retorna true se as senhas coincidirem.
 * A função hashPassword recebe uma senha em texto plano e retorna uma senha "hasheada".
 * A função createToken recebe um usuário e retorna um token JWT.
 * A função verifyToken é um middleware que verifica se o token JWT é válido,
 * e retorna uma resposta com status 401 se não for.
 */

export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash)
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, salts)
}

export function createToken(
  { id, username }: IUser,
  secret = jwtSecret
): string {
  return sign({ id, username }, secret, { expiresIn: '2h' })
}

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined {
  const { authorization } = req.headers

  if (authorization == null) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  try {
    const token = authorization.replace('Bearer ', '')
    const { id, username } = verify(token, jwtSecret) as IUser

    req.user = { id, username }
    next()
  } catch (e) {
    if (e instanceof Error) console.error(e.stack)
    res.status(401).json({ error: 'Invalid token' })
  }
}
