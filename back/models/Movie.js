const mongoose = require('mongoose')

const movieShema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    releaseYear: Number,
    runtime: Number,
    image: { type: Object, required: true },

    genres: [String],
    mood: [String],
    country: String,

    rating: Number,
    director: String,
    cast: [String],
    writers: [String],
    ageRating: String,
    
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Movie', movieShema)