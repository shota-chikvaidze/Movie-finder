const express = require('express')
const favoriteController = require('../controllers/favoriteController')
const protect = require('../middleware/protect')
const router = express.Router()

router.post('/movie/favorite/:movieId', protect, favoriteController.addMovie)
router.get('/get-favorites', protect, favoriteController.getFavorites)

module.exports = router