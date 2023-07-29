import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from '../modules/db'
import { type UserInput } from '../../interfaces'
import { comparePasswords, createToken, hashPassword } from '../modules/auth'

// Cria um novo usuário com o nome de usuário e senha fornecidos no corpo da solicitação.
export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { username, password } = req.body as UserInput

    // Cria um novo usuário no banco de dados usando o Prisma e o hash da senha fornecida.
    const user = await prisma.user.create({
      data: {
        username,
        password: await hashPassword(password)
      }
    })

    // Cria um token de autenticação para o novo usuário.
    const token = createToken({ id: user.id, username })

    // Retorna o token de autenticação em formato JSON na resposta com status 201 (Created).
    res.status(201).json({ token })
  } catch (e: any) {
    // Encaminha o erro para o middleware de tratamento de erros, marcando-o como um erro relacionado a entrada de dados ('input').
    e.type = 'input'
    next(e)
  }
}

// Realiza o processo de autenticação para o usuário fornecido no corpo da solicitação.
export async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { username, password } = req.body as UserInput

    // Procura o usuário no banco de dados com o nome de usuário fornecido.
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    // Verifica se o usuário existe e se a senha fornecida é válida.
    if (user == null || !(await comparePasswords(password, user.password))) {
      // Se o usuário não for encontrado ou a senha for inválida, retorna uma resposta com status 401 (Unauthorized).
      res.status(401).json({ message: 'Invalid username or password' })
      return
    }

    // Cria um token de autenticação para o usuário autenticado.
    const token = createToken({ id: user.id, username })

    // Retorna o token de autenticação em formato JSON na resposta com status 200 (OK).
    res.status(200).json({ token })
  } catch (e: any) {
    // Encaminha o erro para o middleware de tratamento de erros, marcando-o como um erro relacionado à autenticação ('auth').
    e.type = 'auth'
    next(e)
  }
}
