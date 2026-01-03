const GENRE_TO_MOODS = {
  Action: ['Intense', 'Epic', 'Adventurous'],
  Adventure: ['Epic', 'Adventurous'],
  Drama: ['Emotional', 'Serious', 'Thought-Provoking'],
  Thriller: ['Suspenseful', 'Intense', 'Mysterious'],
  Horror: ['Dark', 'Intense', 'Gritty'],
  Comedy: ['Funny', 'Feel-Good', 'Chill'],
  Romance: ['Romantic', 'Emotional', 'Heartwarming'],
  'Science Fiction': ['Epic', 'Thought-Provoking', 'Mysterious'],
  Fantasy: ['Epic', 'Inspirational', 'Adventurous'],
  Mystery: ['Mysterious', 'Suspenseful'],
  Crime: ['Gritty', 'Dark', 'Serious'],
  Animation: ['Feel-Good', 'Heartwarming'],
  Family: ['Feel-Good', 'Hopeful'],
  War: ['Serious', 'Gritty', 'Emotional'],
  History: ['Serious', 'Thought-Provoking'],
  Music: ['Feel-Good', 'Inspirational'],
  Documentary: ['Serious', 'Thought-Provoking']
}

function deriveMoods(genres = []) {
  const moods = new Set()

  for (const genre of genres) {
    const mapped = GENRE_TO_MOODS[genre]
    if (mapped) mapped.forEach(m => moods.add(m))
  }

  return Array.from(moods)
}

module.exports = { deriveMoods }
