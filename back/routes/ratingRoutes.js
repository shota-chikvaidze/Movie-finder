const express = require('express')
const ratingController = require('../controllers/ratingController')
const protect = require('../middleware/protect')
const router = express.Router()

router.post('/add-rating', protect, ratingController.rate)

module.exports = router