import supertest from 'supertest'
import app from '../app'

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

  describe('post /api/signup', () => {
    it('should return 201 and a token', async () => {
      validationResult().isEmpty.mockReturnValue(true)

      const res = await supertest(app).post('/api/signup').send({
        username: 'test',
        password: 'test12345'
      })

      expect(res.body.error).toBeUndefined()
      expect(res.status).toBe(201)
      expect(res.body.token).toBeDefined()
    })
  })
})
