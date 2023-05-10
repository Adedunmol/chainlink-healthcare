require('express-async-errors')
const express = require('express')
const connectDB = require('./config/dbConn')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const routeNotFound = require('./middlewares/route-not-found')
const authRouter = require('./routes/auth.route')

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/auth', authRouter)

app.use(routeNotFound)
app.use(errorHandlerMiddleware)

module.exports = app