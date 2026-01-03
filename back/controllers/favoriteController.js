const User = require('../models/User')

exports.addMovie = async (req, res) => {
    try{

        const movieId = req.params.id
        const userId = req.user.id

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: 'user not found'})

        const index = user.favorite.indexOf(movieId)
        const includesMovie = user.favorite.includes(movieId)

        if(includesMovie){
            return res.status(400).json({message: 'Movie already exists'})
        }

        if(index === -1){
            user.favorite.push(movieId)
        }

        await user.save()

        res.status(200).json({message: 'movie added to favorites', favorites: user.favorite})


    }catch(err){
        res.status(500).json({message: 'error adding movie to favorites', error: err.message})
    }
}

exports.getFavorites = async (req, res) => {
    try{

        const userId = req.user.id

        const user = await User.findById(userId).populate('favorite')
        if(!user) return res.status(404).json({message: 'user not found'})

        res.status(200).json({message: 'fovorites received successfully', fav: user.favorite})

    }catch(err){
        res.status(500).json({message: 'error getting favorites', error: err.message})
    }
}

exports.deleteFavMovie = async (req, res) => {
    try{
        
        const movieId = req.params.id
        const userId = req.user.id

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favorite: movieId } },
            { new: true }
        )

        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        res.status(200).json({ message: 'Movie removed from favorite' })

    }catch(err){
        res.status(500).json({message: 'error deleting movie', error: err.message})
    }
}