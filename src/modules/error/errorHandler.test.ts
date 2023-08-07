import { type Response } from 'express'
import { errorHandler } from './errorHandler'

describe('errorHandler', () => {
  let mockedResponse: any
  let req: any
  let next: any

  beforeEach(() => {
    mockedResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 status code and "Unauthorized" message when error type is "auth"', () => {
    const error = { type: 'auth' }

    errorHandler(error, req, mockedResponse as Response, next)

    expect(mockedResponse.status).toHaveBeenCalledWith(401)
    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: 'Unauthorized'
    })
  })

  it('should return 400 status code and "Bad request" message when error type is "input"', () => {
    const error = { type: 'input' }

    errorHandler(error, req, mockedResponse as Response, next)

    expect(mockedResponse.status).toHaveBeenCalledWith(400)
    expect(mockedResponse.json).toHaveBeenCalledWith({ message: 'Bad request' })
  })

  it('should return 500 status code and "Internal server error" message for any other type of error', () => {
    const error = { type: 'unknown' }

    errorHandler(error, req, mockedResponse as Response, next)

    expect(mockedResponse.status).toHaveBeenCalledWith(500)
    expect(mockedResponse.json).toHaveBeenCalledWith({
      message: 'Internal server error'
    })
  })
})
