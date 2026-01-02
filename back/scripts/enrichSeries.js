require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')
const Movie = require('../models/Movie')

const TMDB_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

const BATCH_SIZE = 20
const DELAY_MS = 1200

async function enrichSeries() {
  await mongoose.connect(process.env.MONGODB)
  console.log('Connected to DB')

  while (true) {
    const series = await Movie.find({
      type: 'series',
      isEnriched: { $ne: true }
    }).limit(BATCH_SIZE)


    if (series.length === 0) {
      console.log('All series enriched ✅')
      break
    }

    console.log(`\nProcessing batch of ${series.length} series...`)

    for (const show of series) {
      try {
        const id = show.tmdbId

        console.log(`Fetching data for: ${show.title} (ID: ${id})`)

        const [details, credits, contentRatings] = await Promise.all([
          axios.get(`${TMDB_URL}/tv/${id}`, {
            params: { api_key: API_KEY }
          }),
          axios.get(`${TMDB_URL}/tv/${id}/credits`, {
            params: { api_key: API_KEY }
          }),
          axios.get(`${TMDB_URL}/tv/${id}/content_ratings`, {
            params: { api_key: API_KEY }
          })
        ])

        const creator = details.data.created_by?.[0]?.name || null

        const writersSet = new Set()
        credits.data.crew
          .filter(c => ['Writer', 'Screenplay', 'Story', 'Creator'].includes(c.job))
          .forEach(w => writersSet.add(w.name))
        const writers = Array.from(writersSet).slice(0, 4)

        const usRating = contentRatings.data.results.find(r => r.iso_3166_1 === 'US')
        const ageRating = usRating?.rating || null

        const countries = details.data.production_countries?.map(c => c.name) || []

        const runtime = details.data.episode_run_time?.[0] || null

        const releaseYear = details.data.first_air_date
          ? Number(details.data.first_air_date.slice(0, 4))
          : show.releaseYear || null

        await Movie.updateOne(
          { _id: show._id },
          {
            $set: {
              runtime,
              genres: details.data.genres.map(g => g.name),
              countries,
              director: creator,
              writers,
              cast: credits.data.cast.slice(0, 10).map(a => a.name),
              ageRating,
              releaseYear,
              isEnriched: true
            }
          }
        )


        console.log(`✅ Enriched: ${show.title}`)
        await new Promise(r => setTimeout(r, DELAY_MS))

      } catch (err) {
        console.error(`❌ Failed: ${show.title}`, err.response?.status || err.message)
        await new Promise(r => setTimeout(r, DELAY_MS))
      }
    }
  }

  console.log('\n🎉 All series have been enriched!')
  await mongoose.disconnect()
  process.exit(0)
}

enrichSeries()
