const express = require('express')
const { createGoalController, getGoalsController, getGoalController, updateGoalController, deleteGoalController } = require('../controllers/goal.controller')
const router = express.Router()

router.route('/').post(createGoalController).get(getGoalsController)
router.route('/:id').get(getGoalController).patch(updateGoalController).delete(deleteGoalController)

module.exports = router