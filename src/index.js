const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`)
    })
})