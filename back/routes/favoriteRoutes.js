const express = require('express')
const favoriteController = require('../controllers/favoriteController')
const protect = require('../middleware/protect')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Favorites
 *     description: User favorite movies management
 */

/**
 * @swagger
 * /api/favorite/movie/favorite/{id}:
 *   post:
 *     summary: Add or remove a movie from user's favorites
 *     description: Toggles a movie in the authenticated user's favorites list. If the movie is already in favorites, it will be removed. If not, it will be added. This endpoint acts as a toggle for favoriting movies.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique MongoDB ObjectId of the movie to add/remove from favorites
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Successfully toggled movie in favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie added to favorites"
 *                 isFavorite:
 *                   type: boolean
 *                   description: Current favorite status after toggle
 *                   example: true
 *                 favorites:
 *                   type: array
 *                   description: Updated list of favorite movie IDs
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
 *                   example: "Error updating favorites"
 *                 error:
 *                   type: string
 */
router.post('/movie/favorite/:id', protect, favoriteController.addMovie)

/**
 * @swagger
 * /api/favorite/get-favorites:
 *   get:
 *     summary: Get all favorite movies for the authenticated user
 *     description: Retrieves a complete list of movies that the authenticated user has marked as favorites. Returns full movie details including title, poster, ratings, and other metadata for each favorited movie.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved favorite movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorites:
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
 *                           backdrop:
 *                             type: string
 *                             example: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg"
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
 *                       description:
 *                         type: string
 *                         example: "Two imprisoned men bond over a number of years..."
 *                       addedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the movie was added to favorites
 *                         example: "2024-12-15T10:30:00.000Z"
 *                 count:
 *                   type: number
 *                   description: Total number of favorite movies
 *                   example: 15
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
 *                   example: "Error retrieving favorites"
 *                 error:
 *                   type: string
 */
router.get('/get-favorites', protect, favoriteController.getFavorites)

router.delete('/delete-favorite/:id', protect, favoriteController.deleteFavMovie)

module.exports = router