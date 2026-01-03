const User = require('../models/User')

exports.addMovie = async (req, res) => {
    try{

        const movieId = req.params.id
        const userId = req.user.id

        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: 'user not found'})

        const index = user.favorite.indexOf(movieId)

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