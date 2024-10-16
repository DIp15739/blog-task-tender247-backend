const errorHandler = (err, req, res, next) => {
  console.error(err)
  const statusCode = err?.statusCode || 500
  const message = err?.message || 'An unexpected error occurred'

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  })
}

const successResponse = (res, data, message = 'Success') => {
  res.status(200).json({
    status: 'success',
    message,
    data,
  })
}

module.exports = { errorHandler, successResponse }
