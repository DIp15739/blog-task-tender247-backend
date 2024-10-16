require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/authRoutes')
const postRoutes = require('./src/routes/postRoutes')
const { sequelize } = require('./database/connection')
const { errorHandler } = require('./src/middlewares/errorMiddleware')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, async () => {
  await sequelize.sync()
  console.log(`Server running on port ${PORT}`)
})
