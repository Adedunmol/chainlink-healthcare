const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for your goal']
    },
    happiness_level: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: [true, 'Please provide a number representing your happiness level']
    },
    physical_health: {
        type: String,
        required: [true, 'Please provide your physical health status'],
        enum: ['Good', 'Fair', 'Poor']
    },
    category: {
        type: String,
        enum: ['Exercise', 'Meditation', 'Journaling', 'Social Connection', 'Sleeping', 'Learning'],
        required: [true, 'Please provide a category for your goal'],

    },
    duration: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        required: [true, 'Please provide a duration for your goal'],

    },
    frequency: {
        type: Number,
    },
    task: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
})

module.exports = mongoose.model('Goal', goalSchema)