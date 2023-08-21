import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import { prismaMock } from '../singleton'
import { user, validationResultMock } from './router.mock'

describe('product routes', () => {
  let verifySpy: jest.SpyInstance

  beforeEach(() => {
    verifySpy = jest.spyOn(jwt, 'verify')
    verifySpy.mockReturnValue({ id: user.id, username: user.username })
    validationResultMock().isEmpty.mockReturnValue(true)
    prismaMock.user.findUnique.mockResolvedValue(user)
  })

  describe('get /api/product', () => {
    it('should return 200 and a list of products', async () => {
      const res = await supertest(app)
        .get('/api/product')
        .set('authorization', 'Bearer validToken')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body.data).toBeInstanceOf(Array)
    })
  })

  describe('post /api/product', () => {
    it('should return 201 and the created product', async () => {
      const res = await supertest(app)
        .post('/api/product')
        .send({ name: 'test' })
        .set('authorization', 'Bearer validToken')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(201)
      expect(res.body.data).toBeDefined()
    })
  })
})
