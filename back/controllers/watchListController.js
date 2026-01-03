const User = require('../models/User')

exports.addMovie = async (req, res) => {
    try{

        const userId = req.user.id
        const movieId = req.params.id

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: 'user not found'})

        const index = user.watchList.indexOf(movieId)
        const includesMovie = user.watchList.includes(movieId)

        if(includesMovie){
            return res.status(400).json({message: 'Movie already exists'})
        }

        if(index === -1){
            user.watchList.push(movieId)
        }

        await user.save()

        res.status(200).json({message: 'movie added successfully', watchlists: user.watchList})

    }catch(err){
        res.status(500).json({message: 'error adding movie', error: err.message})
    }
}

exports.getWatchlist = async (req, res) => {
    try{

        const userId = req.user.id

        const user = await User.findById(userId).populate('watchList')
        if(!user) return res.status(404).json({message: 'user not found'})

        res.status(200).json({message: 'movie received successfully', watchlists: user.watchList})

    }catch(err){
        res.status(500).json({message: 'error getting watchlist movie', error: err.message})
    }
}

exports.deleteMovie = async (req, res) => {
    try{
        
        const movieId = req.params.id
        const userId = req.user.id

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { watchList: movieId } },
            { new: true }
        )

        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        res.status(200).json({ message: 'Movie removed from watchlist' })

    }catch(err){
        res.status(500).json({message: 'error deleting movie', error: err.message})
    }
}