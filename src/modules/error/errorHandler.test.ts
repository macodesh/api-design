import { type Response } from 'express'
import errorHandler from './errorHandler'

describe('errorHandler', () => {
  let req: any
  let next: any

  const mockedResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  it('should return 500 status code and "Internal server error" message for any other type of error', () => {
    const error = { type: 'unknown' }

    errorHandler(error, req, mockedResponse as Response, next)

    expect(mockedResponse.status).toHaveBeenCalledWith(500)
    expect(mockedResponse.json).toBeCalled()
  })
})
