const express = require('express')
const { registerUserController } = require('../controllers/auth.controller')
const router = express.Router()

router.route('/register').post(registerUserController)
router.route('/login').post(loginUserController)

module.exports = router