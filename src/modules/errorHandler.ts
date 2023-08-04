import { type ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)

  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Bad request' })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}
