import supertest from 'supertest'
import app from '../app'
import { prismaMock } from '../singleton'
import { user, validationResultMock } from './router.mock'

describe('product routes', () => {
  describe('get /api/product', () => {
    it('should return 200 and a list of products', async () => {
      validationResultMock().isEmpty.mockReturnValue(true)
      prismaMock.user.findUnique.mockResolvedValue(user)

      const res = await supertest(app).get('/api/product')

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(200)
      expect(res.body.data.products).toHaveLength(2)
    })
  })
})
