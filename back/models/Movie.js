const mongoose = require('mongoose')

const movieShema = mongoose.Schema({
    tmdbId: { type: Number, unique: true },
    title: { type: String, required: true },
    overview: String,
    releaseYear: Number,
    runtime: Number,
    image: { poster: { type: String, required: true }, backdrop: String},

    popularity: Number,
    genres: [String],
    mood: [String],
    countries: [String],

    rating: { type: Number, min: 0, max: 10 },
    director: String,
    cast: [String],
    writers: [String],
    ageRating: String,

    type: { type: String, enum: ['movie', 'series'], required: true },
    isEnriched: { type: Boolean, default: false }

    

}, { timestamps: true })

module.exports = mongoose.model('Movie', movieShema)

