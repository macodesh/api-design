import supertest from 'supertest'
import { app } from '../app'

describe('GET /api', () => {
  it('should return 200 and message: "Hello, World!"', async () => {
    const res = await supertest(app).get('/api')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Hello, World!')
  })
})
