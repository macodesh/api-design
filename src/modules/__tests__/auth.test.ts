import { hash } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'
import {
  comparePasswords,
  createToken,
  hashPassword,
  verifyToken
} from '../auth'
import { type IUser } from '../../interfaces'

describe.skip('comparePasswords', () => {
  it('should return true if password matches hash', async () => {
    // Define a senha para ser comparada.
    const password = 'password123'
    // Cria um hash da senha usando bcrypt com salt (cost) 10.
    const hashed = await hash(password, 10)

    // Chama a função comparePasswords com a senha e o hash criado.
    const result = await comparePasswords(password, hashed)

    // Verifica se o resultado retornado é verdadeiro, indicando que a senha corresponde ao hash.
    expect(result).toBe(true)
  })

  it('should return false if password does not match hash', async () => {
    // Define a senha original.
    const password = 'password123'
    // Define uma senha incorreta.
    const incorrectPassword = 'wrongpassword'
    // Cria um hash da senha original usando bcrypt com salt (cost) 10.
    const hashed = await hash(password, 10)

    // Chama a função comparePasswords com a senha incorreta e o hash criado.
    const result = await comparePasswords(incorrectPassword, hashed)

    // Verifica se o resultado retornado é falso, indicando que a senha não corresponde ao hash.
    expect(result).toBe(false)
  })
})

describe.skip('hashPassword', () => {
  it('should return a hash of the password', async () => {
    const password = 'password123'
    const hashedPassword = await hashPassword(password)

    expect(hashedPassword).toBeDefined()
    expect(typeof hashedPassword).toBe('string')
  })
})

describe.skip('createToken', () => {
  // Test case: creating a token with valid user information
  it('createToken should return a valid JWT token', () => {
    const user = { id: '1', username: 'testuser' }
    const token = createToken(user, 'secret')
    const decoded = verify(token, 'secret') as IUser

    expect(decoded.id).toBe(user.id)
    expect(decoded.username).toBe(user.username)
  })
})

describe('verifyToken', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: jest.Mock

  beforeEach(() => {
    req = { headers: {} }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    next = jest.fn()
  })

  it('should return 401 and "Unauthorized" message when authorization header is null', () => {
    verifyToken(req as Request, res as Response, next as NextFunction)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
  })

  it('should return 401 and "Invalid token" message when authorization header does not start with "Bearer "', () => {
    req.headers = { authorization: 'InvalidToken' }
    verifyToken(req as Request, res as Response, next as NextFunction)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' })
  })

  it('should populate req.user with decoded user information when token is successfully verified', () => {
    const token = 'validToken'
    const decodedUser = { id: 1, username: 'testUser' }
    const verifyMock = jest.fn().mockReturnValue(decodedUser)
    jest.mock('jsonwebtoken', () => ({ verify: verifyMock }))

    req.headers = { authorization: `Bearer ${token}` }
    verifyToken(req as Request, res as Response, next as NextFunction)
    expect(req.user).toEqual(decodedUser)
    expect(next).toHaveBeenCalled()

    jest.unmock('jsonwebtoken')
  })

  it('should return 401 and "Invalid token" message when an error occurs during token verification or decoding', () => {
    const error = new Error('Invalid token')
    const verifyMock = jest.fn().mockImplementation(() => {
      throw error
    })
    jest.mock('jsonwebtoken', () => ({ verify: verifyMock }))

    req.headers = { authorization: 'Bearer invalidToken' }
    verifyToken(req as Request, res as Response, next as NextFunction)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' })

    jest.unmock('jsonwebtoken')
  })
})
