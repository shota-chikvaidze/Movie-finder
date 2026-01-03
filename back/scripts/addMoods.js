require('dotenv').config()
const mongoose = require('mongoose')
const Movie = require('../models/Movie')
const { deriveMoods } = require('../utils/moods')

const BATCH_SIZE = 100

async function addMoods() {
  await mongoose.connect(process.env.MONGODB)
  console.log('✅ Connected to DB')

  while (true) {
    const movies = await Movie.find({
      genres: { $exists: true, $ne: [] },
      moodsProcessed: { $ne: true }
    }).limit(BATCH_SIZE)


    if (movies.length === 0) {
      console.log('🎉 All moods added')
      break
    }

    for (const movie of movies) {
      const moods = deriveMoods(movie.genres)

      await Movie.updateOne(
        { _id: movie._id },
        { $set: { moods, moodsProcessed: true } }
      )

      console.log(`🧠 Moods added → ${movie.title}`)
    }
  }

  await mongoose.disconnect()
  process.exit(0)
}

addMoods()
