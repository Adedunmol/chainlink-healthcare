const express = require('express')
const { createGoalController } = require('../controllers/goal.controller')
const router = express.Router()

router.route('/').post(createGoalController)

module.exports = router