import supertest from 'supertest'
import app from '../app'
import { prismaMock } from '../singleton'

const validationResult = jest.fn(() => ({
  isEmpty: jest.fn(() => true),
  array: jest.fn(() => [])
}))

describe('product routes', () => {
  const user = {
    id: '1',
    username: 'test',
    createdAt: new Date(),
    password: 'test12345',
    products: [
      {
        id: '1',
        createdAt: new Date(),
        name: 'product1',
        userId: '1'
      },
      {
        id: '2',
        createdAt: new Date(),
        name: 'product2',
        userId: '2'
      }
    ]
  }

  describe('get /api/product', () => {
    it('should return 200 and a list of products', async () => {
      validationResult().isEmpty.mockReturnValue(true)
      prismaMock.user.findUnique.mockResolvedValue(user)

      const res = await supertest(app).get('/api/product')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body.data.products).toHaveLength(2)
    })
  })
})
