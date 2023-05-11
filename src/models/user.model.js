const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    },
    wallet_address: {
        type: String,
        required: [true, 'Please provide a wallet address']
    },
    refreshToken: [String]
})

module.exports = mongoose.model('User', userSchema)