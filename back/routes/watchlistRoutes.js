const express = require('express')
const watchlistController = require('../controllers/watchListController')
const protect = require('../middleware/protect')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Watchlist
 *     description: User watchlist management for movies to watch later
 */

/**
 * @swagger
 * /api/watchlist/movie/watchlist/{id}:
 *   post:
 *     summary: Add or remove a movie from user's watchlist
 *     description: Toggles a movie in the authenticated user's watchlist. If the movie is already in the watchlist, it will be removed. If not, it will be added. Use this endpoint to manage movies the user wants to watch later.
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique MongoDB ObjectId of the movie to add/remove from watchlist
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Successfully toggled movie in watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie added to watchlist"
 *                 isInWatchlist:
 *                   type: boolean
 *                   description: Current watchlist status after toggle
 *                   example: true
 *                 watchlist:
 *                   type: array
 *                   description: Updated list of watchlist movie IDs
 *                   items:
 *                     type: string
 *                   example: ["507f1f77bcf86cd799439011", "507f191e810c19729de860ea"]
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "no token"
 *       404:
 *         description: Movie not found with the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating watchlist"
 *                 error:
 *                   type: string
 */
router.post('/movie/watchlist/:id', protect, watchlistController.addMovie)

/**
 * @swagger
 * /api/watchlist/get-watchlist-movie:
 *   get:
 *     summary: Get all watchlist movies for the authenticated user
 *     description: Retrieves a complete list of movies that the authenticated user has added to their watchlist. Returns full movie details including title, poster, ratings, and other metadata for each movie to watch later.
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved watchlist movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       title:
 *                         type: string
 *                         example: "Inception"
 *                       image:
 *                         type: object
 *                         properties:
 *                           poster:
 *                             type: string
 *                             example: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
 *                           backdrop:
 *                             type: string
 *                             example: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
 *                       year:
 *                         type: number
 *                         example: 2010
 *                       rating:
 *                         type: number
 *                         example: 8.8
 *                       genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Action", "Sci-Fi", "Thriller"]
 *                       description:
 *                         type: string
 *                         example: "A thief who steals corporate secrets through dream-sharing technology..."
 *                       addedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the movie was added to watchlist
 *                         example: "2024-12-20T14:30:00.000Z"
 *                 count:
 *                   type: number
 *                   description: Total number of movies in watchlist
 *                   example: 23
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "no token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving watchlist"
 *                 error:
 *                   type: string
 */
router.get('/get-watchlist-movie', protect, watchlistController.getWatchlist)

module.exports = router