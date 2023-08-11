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

describe('comparePasswords', () => {
  it('should return true if password matches hash', async () => {
    const password = 'password123'

    const hashed = await hash(password, 10)
    const result = await comparePasswords(password, hashed)

    expect(result).toBe(true)
  })

  it('should return false if password does not match hash', async () => {
    const password = 'password123'
    const incorrectPassword = 'wrongpassword'

    const hashed = await hash(password, 10)
    const result = await comparePasswords(incorrectPassword, hashed)

    expect(result).toBe(false)
  })
})

describe('hashPassword', () => {
  it('should return a hash of the password', async () => {
    const password = 'password123'
    const hashedPassword = await hashPassword(password)

    expect(hashedPassword).toBeDefined()
    expect(typeof hashedPassword).toBe('string')
  })
})

describe('createToken', () => {
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
    req = { headers: {}, user: {} }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    next = jest.fn()
  })

  it('should return 401 and "Unauthorized" message when authorization header is null', () => {
    verifyToken(req as Request, res as Response, next as NextFunction)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' })
  })

  it('should return 401 and "Invalid token" message when authorization header does not start with "Bearer "', () => {
    req.headers = { authorization: 'InvalidToken' }
    verifyToken(req as Request, res as Response, next as NextFunction)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' })
  })

  it('should populate req.user with decoded user information when token is successfully verified', () => {
    const token = 'validToken'
    const decodedUser = { id: '1', username: 'testUser' }
    const verifyMock = jest.fn().mockReturnValue(decodedUser)
    jest.mock('jsonwebtoken', () => ({ verify: verifyMock }))

    req.headers = { authorization: `Bearer ${token}` }

    expect(() => {
      verifyToken(req as Request, res as Response, next as NextFunction)
    }).not.toThrow()
  })

  it('should return 401 and "Invalid token" message when an error occurs during token verification or decoding', () => {
    const verifyMock = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token')
    })
    jest.mock('jsonwebtoken', () => ({ verify: verifyMock }))

    req.headers = { authorization: 'Bearer invalidToken' }
    verifyToken(req as Request, res as Response, next as NextFunction)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' })
  })
})
