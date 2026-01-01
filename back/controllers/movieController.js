const Movie = require('../models/Movie')

exports.getMovie = async (req, res) => {
    try{
        
        const { mood, genre, country, minRating, maxRating, year, search } = req.query
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 20
        const skip = (page - 1) * limit

        const query = {}

        if(mood) query.mood = { $in: [mood] }
        if(search) query.title = { $regex: search, $options: 'i' }
        if(genre) query.genres = { $in: [genre] }
        if(country) query.countries = { $in: [country] }
        if(year) query.releaseYear = Number(year)
        if(minRating || maxRating) {
            query.rating = {}
            if(minRating) query.rating.$gt = Number(minRating)
            if(maxRating) query.rating.$lte = Number(maxRating)
        }

        const totalMovies = await Movie.countDocuments(query)
        const movie = await Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
        
        res.status(200).json({
            message: 'movie received successfully', 
            movie,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalMovies / limit),
                totalMovies,
                hasMore: page * limit < totalMovies
            }
        })

    }catch(err){
        res.status(500).json({message: 'error getting movies', error: err.message})
    }
}

exports.getMoviesById = async (req, res) => {
    try{

        const movie = await Movie.findById(req.params.id)
        res.status(200).json({message: 'movie by id received successfully', movie})

    }catch(err){
        res.status(500).json({message: 'error getting movies by id', error: err.message})
    }
}

exports.addMovie = async (req, res) => {
    try{

        const { title, description, runtime, genres, mood, country, rating, director, cast, writers, ageRating } = req.body

        if(!title || !description || !runtime || !genres || !mood || !country || !rating || !director || !cast || !writers || !ageRating){
            return res.status(400).json({message: 'all fields required'})
        }

        const createMovie = await Movie.create({
            title, 
            description, 
            runtime, 
            genres, 
            mood, 
            country, 
            rating, 
            director, 
            cast, 
            writers, 
            ageRating            
        })

        res.status(201).json({message: 'movie added successfuly', createMovie})
        
    }catch(err){
        res.status(500).json({message: 'error adding movie', error: err.message})
    }
}