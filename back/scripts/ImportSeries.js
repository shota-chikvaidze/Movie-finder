require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')
const Movie = require('../models/Movie')

const TMDB_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

async function seedSeries() {
  await mongoose.connect(process.env.MONGODB)
  console.log('Connected')

  let allSeries = []

  for (let page = 1; page <= 10; page++) {
    const res = await axios.get(`${TMDB_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page
      }
    })

    const series = res.data.results.map(s => ({
      tmdbId: s.id,
      type: 'series',

      title: s.name,
      overview: s.overview,

      releaseYear: s.first_air_date
        ? Number(s.first_air_date.split('-')[0])
        : null,

      runtime: null,

      image: {
        poster: s.poster_path
          ? `https://image.tmdb.org/t/p/w500${s.poster_path}`
          : null,
        backdrop: s.backdrop_path
          ? `https://image.tmdb.org/t/p/original${s.backdrop_path}`
          : null
      },

      popularity: s.popularity,
      genres: [],
      mood: [],
      countries: [],

      rating: s.vote_average,

      director: null,
      cast: [],
      writers: [],
      ageRating: null
    }))

    allSeries.push(...series.filter(s => s.image.poster))
    console.log(`Fetched TV page ${page}`)
  }

  await Movie.insertMany(allSeries, { ordered: false })
  console.log(`Inserted ${allSeries.length} series`)
  process.exit()
}

seedSeries().catch(console.error)
