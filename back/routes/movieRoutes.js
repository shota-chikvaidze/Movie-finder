const express = require('express')
const movieContrller = require('../controllers/movieController')
const recommendationContrller = require('../controllers/recommendation')
const protect = require('../middleware/protect')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: Movie management and retrieval operations
 *   - name: Recommendations
 *     description: Personalized movie recommendations and trending content
 */

/**
 * @swagger
 * /api/movie/get-movies:
 *   get:
 *     summary: Retrieve all movies
 *     description: Fetches a list of all movies in the database. Returns movie details including title, poster, ratings, year, genre, and other metadata. Requires authentication.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       title:
 *                         type: string
 *                         example: "The Shawshank Redemption"
 *                       image:
 *                         type: object
 *                         properties:
 *                           poster:
 *                             type: string
 *                             example: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
 *                       year:
 *                         type: number
 *                         example: 1994
 *                       rating:
 *                         type: number
 *                         example: 9.3
 *                       genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Drama", "Crime"]
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
 *                   example: "Error retrieving movies"
 */
router.get('/get-movies', protect, movieContrller.getMovie)

/**
 * @swagger
 * /api/movie/get-movies-id/{id}:
 *   get:
 *     summary: Retrieve a specific movie by ID
 *     description: Fetches detailed information about a single movie using its unique database ID. Returns complete movie metadata including title, description, cast, ratings, and images.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique MongoDB ObjectId of the movie
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Successfully retrieved movie details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     title:
 *                       type: string
 *                       example: "The Shawshank Redemption"
 *                     description:
 *                       type: string
 *                       example: "Two imprisoned men bond over a number of years..."
 *                     image:
 *                       type: object
 *                       properties:
 *                         poster:
 *                           type: string
 *                         backdrop:
 *                           type: string
 *                     year:
 *                       type: number
 *                       example: 1994
 *                     rating:
 *                       type: number
 *                       example: 9.3
 *                     genre:
 *                       type: array
 *                       items:
 *                         type: string
 *                     cast:
 *                       type: array
 *                       items:
 *                         type: string
 *                     director:
 *                       type: string
 *                       example: "Frank Darabont"
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
 *                   example: "Error retrieving movie"
 */
router.get('/get-movies-id/:id', protect, movieContrller.getMoviesById)

/**
 * @swagger
 * /api/movie/recommendation:
 *   get:
 *     summary: Get personalized movie recommendations
 *     description: Returns a curated list of movie recommendations based on the authenticated user's watch history, ratings, favorites, and preferences. Uses collaborative filtering and content-based algorithms to suggest relevant movies.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved personalized recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       title:
 *                         type: string
 *                         example: "The Dark Knight"
 *                       image:
 *                         type: object
 *                         properties:
 *                           poster:
 *                             type: string
 *                             example: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
 *                       year:
 *                         type: number
 *                         example: 2008
 *                       rating:
 *                         type: number
 *                         example: 9.0
 *                       genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Action", "Crime", "Drama"]
 *                       matchScore:
 *                         type: number
 *                         description: Relevance score based on user preferences
 *                         example: 0.87
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
 *                   example: "Error generating recommendations"
 */
router.get('/recommendation', protect, recommendationContrller.recommendation)

/**
 * @swagger
 * /api/movie/trending:
 *   get:
 *     summary: Get trending movies
 *     description: Retrieves a list of currently trending movies based on popularity metrics, recent ratings, and user engagement. Returns movies that are currently popular among all users of the platform.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved trending movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trending:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       title:
 *                         type: string
 *                         example: "Oppenheimer"
 *                       image:
 *                         type: object
 *                         properties:
 *                           poster:
 *                             type: string
 *                             example: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
 *                       year:
 *                         type: number
 *                         example: 2023
 *                       rating:
 *                         type: number
 *                         example: 8.5
 *                       genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Biography", "Drama", "History"]
 *                       trendingScore:
 *                         type: number
 *                         description: Popularity metric
 *                         example: 95.8
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
 *                   example: "Error retrieving trending movies"
 */
router.get('/trending', protect, recommendationContrller.trending)

module.exports = router
