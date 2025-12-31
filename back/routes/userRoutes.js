const express = require('express')
const userController = require('../controllers/userController')
const protect = require('../middleware/protect')
const passport = require('passport')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/me', protect, userController.getUser)
router.post('/logout', protect, userController.logout)

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { session: true, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
  userController.googleCallback
)

module.exports = router