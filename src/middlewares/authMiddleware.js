require('dotenv').config()
const jwt = require('jsonwebtoken')
const { errorHandler } = require('./errorMiddleware')

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token)
    return errorHandler(
      { statusCode: 401, message: 'No token provided' },
      '',
      res
    )

  jwt.verify(token, process.env.JWT_SECRET || '1234', (err, decoded) => {
    if (err)
      return errorHandler({ statusCode: 401, message: 'Unauthorized' }, '', res)

    req.user = decoded
    next()
  })
}

module.exports = authMiddleware
