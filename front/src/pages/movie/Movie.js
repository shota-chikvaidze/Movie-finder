import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import './Movie.css'
import TrendingMovies from '../../components/trendingMovies/TrendingMovies';
import Recommendation from '../../components/recommendation/Recommendation';
import { Link } from 'react-router-dom';

import { FaStar } from "react-icons/fa";


export const Movie = () => {

  const [movies, setMovies] = useState([])
  const [mood, setMood] = useState('')
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [country, setCountry] = useState('')
  const [year, setYear] = useState()
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(0)

  const fetchMovies = async () => {
    try{

      const res = await axios.get('/movie/get-movies', {
        params: {
          mood: mood,
          genre: genre,
          country: country,
          year: year > 0 ? year : undefined,
          minRating: minRating > 0 ? minRating : undefined,
          maxRating: maxRating > 0 ? maxRating : undefined,
          search: search,
        }
      })
      setMovies(res.data.movie)

    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [mood, search, minRating, year, country, genre])

  const resetFilters = () => {
    setMood('')
    setSearch('')
    setGenre('')
    setCountry('')
    setYear(0)
    setMinRating(0)
    setMovies([])
  }


  return (
    <>
    
      <TrendingMovies />

      <Recommendation />

      <section className="movie_filter_sect">
        <div className="movie_filter_container">
          <div className='filter_item'>

          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter_input"
          />

          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="filter_select">
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
          </select>

          <select value={mood} onChange={(e) => setMood(e.target.value)} className="filter_select">
            <option value="">All Moods</option>
            <option value="Exciting">Exciting</option>
            <option value="Romantic">Romantic</option>
            <option value="Dark">Dark</option>
            <option value="Mind-bending">Mind-bending</option>
          </select>

          <select value={country} onChange={(e) => setCountry(e.target.value)} className="filter_select">
            <option value="">All Countries</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)} className="filter_select">
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>

          <input
            type="range"
            min="1"
            max="10"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="filter_range"
          />
          <span className="filter_range_label">Min Rating: {minRating}</span>

          <div className="filter_buttons">
            <button onClick={resetFilters} className="filter_clear">Clear</button>
          </div>

          </div>
        </div>
      </section>


      <section className='all_movies_sect'>
        <div className='movie_title_wrapper'>
          <span className='movie_title_span'>
            <p className='movies_title'> Popular movies </p>
          </span>
        </div>
          
        <div className='all_movies_container'>
          <div className='all_movies_wrapper'>

            {movies.map((movie) => (
              <div key={movie._id} className="movie_card">
                <div className="movie_card_img">
                  <Link to={`/movies/${movie._id}`}>
                    <img src={movie.image} alt={`${movie.title} Poster`} />
                  </Link>
                </div>

                <div className="movie_card_body">
                  <h3 className="movie_title">{movie.title}</h3>
                  <p className="movie_desc">{movie.description}</p>
                  <div className="movie_meta">
                    <span className="movie_genres">{movie.genres?.join(', ')}</span>
                    <span className="movie_rating"> <FaStar className='star_icon' /> {movie.rating}</span>
                  </div>
                </div>
                
              </div>
            ))}

          </div>
        </div>

      </section>
    </>
  )
}
