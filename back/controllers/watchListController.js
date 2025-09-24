const User = require('../models/User')

exports.addMovie = async (req, res) => {
    try{

        const userId = req.user.id
        const movieId = req.params.id

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: 'user not found'})

        const index = user.watchList.indexOf(movieId)

        if(index === -1){
            user.watchList.push(movieId)
        }else{
            user.watchList.splice(index, 1)
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