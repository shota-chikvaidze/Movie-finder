const express = require('express')
const ratingController = require('../controllers/ratingController')
const protect = require('../middleware/protect')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Ratings
 *     description: Movie rating and review management
 */

/**
 * @swagger
 * /api/rating/add-rating:
 *   post:
 *     summary: Add or update a movie rating
 *     description: Allows authenticated users to rate a movie on a scale (typically 1-10). If the user has already rated this movie, the rating will be updated. Otherwise, a new rating will be created. Ratings contribute to movie recommendations and trending calculations.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - rating
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: The unique MongoDB ObjectId of the movie to rate
 *                 example: "507f1f77bcf86cd799439011"
 *               rating:
 *                 type: number
 *                 description: Rating value between 1 and 10
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 8.5
 *               review:
 *                 type: string
 *                 description: Optional written review or comment
 *                 example: "An absolute masterpiece! The cinematography was stunning and the plot kept me engaged throughout."
 *     responses:
 *       200:
 *         description: Rating successfully added or updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rating added successfully"
 *                 rating:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f191e810c19729de860ea"
 *                     userId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     movieId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     rating:
 *                       type: number
 *                       example: 8.5
 *                     review:
 *                       type: string
 *                       example: "An absolute masterpiece!"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-25T18:45:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-25T18:45:00.000Z"
 *       400:
 *         description: Bad request - Missing required fields or invalid rating value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rating must be between 1 and 10"
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
 *                   example: "Error adding rating"
 *                 error:
 *                   type: string
 */
router.post('/add-rating', protect, ratingController.rate)

module.exports = router