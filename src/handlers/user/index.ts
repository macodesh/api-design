import { type NextFunction, type Request, type Response } from 'express'
import prisma from '../../modules/db'
import { type UserInput } from '../../interfaces'
import { comparePasswords, createToken, hashPassword } from '../../modules/auth'

export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { username, password } = req.body as UserInput

    const user = await prisma.user.create({
      data: {
        username,
        password: await hashPassword(password)
      }
    })

    const token = createToken({ id: user.id, username })

    res.status(201).json({ token })
  } catch (e) {
    next(e)
  }
}

export async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { username, password } = req.body as UserInput

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (user == null || !(await comparePasswords(password, user.password))) {
      res.status(401).json({ error: 'Invalid username or password' })
      return
    }

    const token = createToken({ id: user.id, username })

    res.status(200).json({ token })
  } catch (e) {
    next(e)
  }
}
