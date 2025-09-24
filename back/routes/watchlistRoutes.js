const express = require('express')
const watchlistController = require('../controllers/watchListController')
const protect = require('../middleware/protect')
const router = express.Router()

router.post('/movie/watchlist/:id', protect, watchlistController.addMovie)
router.get('/get-watchlist-movie', protect, watchlistController.getWatchlist)

module.exports = router