const User = require('../models/User')
const Rating = require('../models/Rating')
const Movie = require('../models/Movie')

exports.recommendation = async (req, res) => {
    try{

        const userId = req.user.id

        const user = await User.findById(userId)
            .populate('favorite')
            .populate('watchList')

        if(!user){
            return res.status(404).json({message: 'user not found'})
        }

        
        const favorites = user.favorite       
        const watchlist = user.watchList        
        
        const rating = await Rating.find({ userId })
        const likedRatedMovies = rating
            .filter(r => r.rating >= 7)
            .map(r => r.movieId)

        const movieId = [
            ...new Set([...favorites, ...watchlist, ...likedRatedMovies])
        ]

        const likedMovies = await Movie.find({ _id: { $in: movieId } })
        
        let userGenres = []
        let userMoods = []

        likedMovies.forEach(movie => {
            if (movie.genres) userGenres.push(...movie.genres)
            if (movie.mood) userMoods.push(...movie.mood)
        })

        userGenres = [...new Set(userGenres)]
        userMoods = [...new Set(userMoods)]

        const recommendation = await Movie.find({
            $or: [
                { genres: { $in: userGenres } },    
                { mood: { $in: userMoods } }, 
            ],

            _id: { $nin: movieId }
        }).sort({ rating: -1 }).limit(10)

        res.status(200).json({
            message: 'recommendations generated',
            userProfile: { userGenres, userMoods },
            recommendation,
        })


    }catch(err){
        res.status(500).json({message: 'error getting recommendation', error: err.message})
    }
}

exports.trending = async (req, res) => {
    try{

        const trending = await Movie.find()
            .sort({ rating: -1 })  
            .limit(10)

        res.status(200).json({message: 'trending received successfully', trending})

    }catch(err){
        res.status(500).json({message: 'error getting trending movies', error: err.message})
    }
}