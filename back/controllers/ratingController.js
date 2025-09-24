const Rating = require('../models/Rating')

exports.rate = async (req, res) => {
    try{

        const { rating } = req.body
        const userId = req.user.id
        const movieId = req.params.id

        if(rating > 10 || rating < 1) {
            return res.status(400).json({message: 'rating must be between these numbers'})
        }

        const exists = await Rating.findOne({ userId, movieId })

        if(exists){
            exists.rating = rating
            await exists.save()
            res.status(200).json({message: 'rating changed sucessfully', rating: exists})
        }else{
            const newRating = new Rating({ rating, userId, movieId })
            await newRating.save()
            res.status(201).json({message: 'rating submited', rating: newRating})  
        }

    }catch(err){
        res.status(500).json({message: 'error rating', error: err.message})
    }
}

