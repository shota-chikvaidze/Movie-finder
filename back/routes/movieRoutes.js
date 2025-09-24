const express = require('express')
const movieContrller = require('../controllers/movieController')
const recommendationContrller = require('../controllers/recommendation')
const protect = require('../middleware/protect')
const router = express.Router()

router.get('/get-movies', protect, movieContrller.getMovie)
router.get('/get-movies-id/:id', protect, movieContrller.getMoviesById)
router.post('/add-movies', movieContrller.addMovie)

router.get('/recommendation', protect, recommendationContrller.recommendation)
router.get('/trending', protect, recommendationContrller.trending)

module.exports = router