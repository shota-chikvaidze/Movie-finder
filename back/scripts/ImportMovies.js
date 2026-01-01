require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')
const Movie = require('../models/Movie')

const TMDB_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

async function importMovies() {
  await mongoose.connect(process.env.MONGODB)

  console.log('Connected to DB')

  let allMovies = []

  for (let page = 1; page <= 10; page++) {
    const res = await axios.get(
      `${TMDB_URL}/movie/popular`,
      {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page
        }
      }
    )

    const movies = res.data.results.map(m => ({
        tmdbId: m.id,

        title: m.title,
        overview: m.overview,

        releaseYear: m.release_date
          ? Number(m.release_date.split('-')[0])
          : null,

        runtime: null,

        image: {
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : null,
          backdrop: m.backdrop_path
            ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
            : null
        },

        popularity: m.popularity,

        genres: [],
        mood: [],
        countries: [],

        rating: m.vote_average,

        director: null,
        cast: [],
        writers: [],
        ageRating: null
    }))

    const filteredMovies = movies.filter(m => m.image.poster)


    allMovies.push(...filteredMovies)
    console.log(`Fetched page ${page}`)
  }

  await Movie.deleteMany({})
  await Movie.insertMany(allMovies, { ordered: false })
  console.log(`Imported ${allMovies.length} movies`)

  process.exit()
}

importMovies().catch(err => {
  console.error(err)
  process.exit(1)
})
