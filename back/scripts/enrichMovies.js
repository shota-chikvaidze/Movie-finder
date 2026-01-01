require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')
const Movie = require('../models/Movie')

const TMDB_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

const BATCH_SIZE = 20
const DELAY_MS = 1200

async function enrichMovies() {
  await mongoose.connect(process.env.MONGODB)
  console.log('Connected to DB')

  while (true) {
    const movies = await Movie.find({ runtime: null }).limit(BATCH_SIZE)

    if (movies.length === 0) {
      console.log('All movies enriched ✅')
      break
    }

    for (const movie of movies) {
      try {
        const id = movie.tmdbId

        const [details, credits, releases] = await Promise.all([
          axios.get(`${TMDB_URL}/movie/${id}`, {
            params: { api_key: API_KEY }
          }),
          axios.get(`${TMDB_URL}/movie/${id}/credits`, {
            params: { api_key: API_KEY }
          }),
          axios.get(`${TMDB_URL}/movie/${id}/release_dates`, {
            params: { api_key: API_KEY }
          })
        ])

        const director = credits.data.crew.find(c => c.job === 'Director')
        const writers = credits.data.crew.filter(c =>
          ['Writer', 'Screenplay'].includes(c.job)
        )

        const usRelease = releases.data.results.find(r => r.iso_3166_1 === 'US')
        const ageRating = usRelease?.release_dates[0]?.certification || null

        await Movie.updateOne(
          { _id: movie._id },
          {
            runtime: details.data.runtime,
            genres: details.data.genres.map(g => g.name),
            countries: details.data.production_countries.map(c => c.name),
            director: director?.name || null,
            writers: writers.map(w => w.name),
            cast: credits.data.cast.slice(0, 10).map(a => a.name),
            ageRating
          }
        )

        console.log(`Enriched: ${movie.title}`)
        await new Promise(r => setTimeout(r, DELAY_MS))

      } catch (err) {
        console.error(`Failed: ${movie.title}`, err.message)
      }
    }
  }

  process.exit()
}

enrichMovies()
