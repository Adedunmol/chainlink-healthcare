const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please type username']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    wallet_address: {
        type: String,
        required: [true, 'Please provide a waller address']
    }
})

module.exports = mongoose.model('User', userSchema)