require('express-async-errors')
require('dotenv').config()
const express = require('express')
const connectDB = require('./config/dbConn')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const routeNotFound = require('./middlewares/route-not-found')
const verifyJWT = require('./middlewares/verifyJWT')
const authRouter = require('./routes/auth.route')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { addUserToRoomController, removeUserFromRoomController } = require('./controllers/user.controller')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

connectDB(process.env.DATABASE_URI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

io.on('connection', (socket) => {
    console.log('A connection has been made')

    socket.on('join', async ({ name, room }, callback) => {
        const user = await addUserToRoomController({ id: socket.id, name, room })

        socket.join(user.room)
        socket.emit('message', {
            user: 'Admin',
            text: `Welcome to ${user.room}`
        })

        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` })
        
        socket.on('sendMessage', ({ message }) => {
            io.to(user.room).emit('message', {
                user: user.name,
                text: message
            })
        })
    })

    socket.on('disconnect', () => {
        const user = removeUserFromRoomController
        console.log(user)
        io.to(user.room).emit('message', {
            user: 'Admin',
            text: `${user.name} just left the room`
        })
        console.log('A disconnection has been made')
    })
})

app.use('/api/v1/auth', authRouter)

app.use(verifyJWT)

app.use(routeNotFound)
app.use(errorHandlerMiddleware)

module.exports = server