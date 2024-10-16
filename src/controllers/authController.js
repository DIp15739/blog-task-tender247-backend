require('dotenv').config()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../database/connection')
const {
  successResponse,
  errorHandler,
} = require('../middlewares/errorMiddleware')

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

exports.registerUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) return errorHandler(error, '', res)
  const { username } = req.body

  try {
    const userCheck = await User.findOne({ where: { username } })
    if (userCheck)
      return errorHandler(
        { statusCode: 409, message: 'user already exists' },
        '',
        res
      )

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({ ...req.body, password: hashedPassword })
    successResponse(
      res,
      { userId: user.id, userName: user.username },
      'User registered successfully'
    )
  } catch (err) {
    next(err)
  }
}

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ where: { username } })
    if (!user)
      return errorHandler(
        { statusCode: 400, message: 'Invalid credentials' },
        '',
        res
      )

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword)
      return errorHandler(
        { statusCode: 400, message: 'Invalid credentials' },
        '',
        res
      )

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '1234', {
      expiresIn: '1h',
    })
    successResponse(res, { token }, 'User logged in successfully')
  } catch (err) {
    next(err)
  }
}
