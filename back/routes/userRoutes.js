const express = require('express')
const userController = require('../controllers/userController')
const protect = require('../middleware/protect')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/google', userController.googleLogin)
router.get('/me', protect, userController.getUser)
router.post('/logout', protect, userController.logout)

module.exports = router