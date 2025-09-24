const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    rating: { type: Number, required: true, min: 1, max: 10 },
    postedAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Rating', ratingSchema)