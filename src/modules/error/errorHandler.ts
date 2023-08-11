import { type ErrorRequestHandler } from 'express'
import config from '../../config'

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (config.env === 'development') {
    res.status(500).json({ error: err.stack })
  } else {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default errorHandler
