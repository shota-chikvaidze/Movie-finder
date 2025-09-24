import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {

    const { id } = useParams()
    const [movieDet, setMovieDet] = useState([])

    const fetchMoviesDet = async () => {
        try{

            console.log('movie fetched:')
            const res = await axios.get(`/movie/get-movies-id/${id}`)
            setMovieDet(res.data.movie)

        }catch(err){
            console.error(err)
        }
    }

    const addFavorites = async () => {
        try{
            
            const res = await axios.post(`/favorite/movie/favorite/${id}`)

        }catch(err){
            console.error(err)
        }
    }

    const addWatchlist = async () => {
        try{
            
            const res = await axios.post(`/watchlist/movie/watchlist/${id}`)

        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        fetchMoviesDet()
    }, [])

  return (
    <section>

        <img src={movieDet.image} alt='Movie Poster' />
        <h2> {movieDet.title} </h2>
        <button onClick={addFavorites}>favorite</button>
        <button onClick={addWatchlist}>watchlist</button>

    </section>
  )
}

export default MovieDetails