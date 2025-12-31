const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const favoriteRoutes = require('./routes/favoriteRoutes')
const watchlistRoutes = require('./routes/watchlistRoutes')
const ratingRoutes = require('./routes/ratingRoutes')

const app = express()

dotenv.config()
app.use(cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true 
}));
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', userRoutes)
app.use('/api/movie', movieRoutes)
app.use('/api/favorite', favoriteRoutes)
app.use('/api/watchlist', watchlistRoutes)
app.use('/api/rating', ratingRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB, {

}).then(() => {
    console.log('mongoDB connected successfuly')
    app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
})