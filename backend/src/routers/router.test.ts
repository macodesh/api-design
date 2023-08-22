import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import { prismaMock } from '../singleton'
import { product, user } from './router.mock'

describe('product routes', () => {
  let verifySpy: jest.SpyInstance

  beforeEach(() => {
    verifySpy = jest.spyOn(jwt, 'verify')
    verifySpy.mockReturnValue({ id: user.id, username: user.username })
  })

  describe('get /api/product', () => {
    it('should return 200 and a list of products', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user)

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
      prismaMock.product.create.mockResolvedValue(product)

      const res = await supertest(app)
        .post('/api/product')
        .send({ name: 'test' })
        .set('authorization', 'Bearer validToken')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(201)
      expect(res.body.data).toBeDefined()
    })
  })

  describe('get /api/product/:id', () => {
    it('should return 200 and the product', async () => {
      prismaMock.product.findUnique.mockResolvedValue(product)

      const res = await supertest(app)
        .get('/api/product/1')
        .set('authorization', 'Bearer validToken')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body.data).toBeDefined()
    })
  })

  describe('put /api/product/:id', () => {
    it('should return 200 and the updated product', async () => {
      prismaMock.product.update.mockResolvedValue(product)

      const res = await supertest(app)
        .put('/api/product/1')
        .send({ name: 'test' })
        .set('authorization', 'Bearer validToken')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body.data).toBeDefined()
    })
  })

  describe('delete /api/product/:id', () => {
    it('should return 200 and the deleted product', async () => {
      prismaMock.product.delete.mockResolvedValue(product)

      const res = await supertest(app)
        .delete('/api/product/1')
        .set('authorization', 'Bearer validToken')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body.data).toBeDefined()
    })
  })
})
