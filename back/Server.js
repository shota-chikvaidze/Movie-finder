require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const initPassport = require('./config/passport')

const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const favoriteRoutes = require('./routes/favoriteRoutes')
const watchlistRoutes = require('./routes/watchlistRoutes')
const ratingRoutes = require('./routes/ratingRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')


const app = express()
initPassport()

app.set('trust proxy', 1)  // Trust first proxy (required for Render)

app.use(cors({
    origin: [
      process.env.CLIENT_URL,
      'https://movie-finder-ten-rho.vercel.app'
    ],
    credentials: true 
}));
app.use(express.json())
app.use(cookieParser())

app.use(session({
  secret: process.env.JWT,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', userRoutes)
app.use('/api/movie', movieRoutes)
app.use('/api/favorite', favoriteRoutes)
app.use('/api/watchlist', watchlistRoutes)
app.use('/api/rating', ratingRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB, {

}).then(() => {
    console.log('mongoDB connected successfuly')
    app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
})