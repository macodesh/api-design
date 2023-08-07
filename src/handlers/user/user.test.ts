import { type Request, type Response } from 'express'
import * as user from '../user'

describe('The user handler', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        username: 'test',
        password: 'test'
      }
    }

    const res = {
      json({ token }: { token: string }) {
        expect(token).toBeDefined()
      }
    }

    await user.createNewUser(req as Request, res as Response, () => {})
  })
})
