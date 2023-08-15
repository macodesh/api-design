import supertest from 'supertest'
import app from '../app'
import { prismaMock } from '../singleton'
import * as auth from '../modules/auth'

describe('get /api', () => {
  it('should return 200 and message: "Hello, World!"', async () => {
    const res = await supertest(app).get('/api')
    expect(res.status).toBe(200)
    expect(res.body.data).toBe('Hello, World!')
  })
})

describe('user routes', () => {
  const validationResult = jest.fn(() => ({
    isEmpty: jest.fn(() => true),
    array: jest.fn(() => [])
  }))

  const user = {
    id: '1',
    username: 'test',
    createdAt: new Date(),
    password: 'test12345'
  }

  describe('post /api/signup', () => {
    it('should return 201 and a token', async () => {
      validationResult().isEmpty.mockReturnValue(true)
      prismaMock.user.create.mockResolvedValue(user)

      const res = await supertest(app).post('/api/signup').send({
        username: user.username,
        password: user.password
      })

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(201)
      expect(res.body.token).toBeDefined()
    })
  })

  describe('post /api/signin', () => {
    const comparePasswordsMock = jest.spyOn(auth, 'comparePasswords')

    it('should return 200 and a token', async () => {
      validationResult().isEmpty.mockReturnValue(true)
      prismaMock.user.findUnique.mockResolvedValue(user)
      comparePasswordsMock.mockResolvedValue(true)

      const res = await supertest(app).post('/api/signin').send({
        username: user.username,
        password: user.password
      })

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body.token).toBeDefined()
    })
  })
})
