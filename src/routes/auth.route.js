const express = require('express')
const { registerUserController, loginUserController } = require('../controllers/auth.controller')
const router = express.Router()

router.route('/register').post(registerUserController)
router.route('/login').post(loginUserController)
router.route('/logout').get(logout)

module.exports = router