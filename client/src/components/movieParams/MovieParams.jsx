import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetMovieIdEndpoint } from '../../api/endpoint/movie'
import { WatchlistEndpoint } from '../../api/endpoint/watchlist'
import { FavoriteEndpoint } from '../../api/endpoint/favorites'
import { useQuery, useMutation } from '@tanstack/react-query'
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const MovieParams = () => {

  const { id } = useParams()

  const { data: getMovieId = [] } = useQuery({
    queryKey: ['movie-id'],
    queryFn: () => GetMovieIdEndpoint(id)
  })
  const movie = getMovieId?.movie || []
  const [message, setMessage] = useState('')


  const watchListMutation = useMutation({
    mutationKey: ['add-watchlist'],
    mutationFn: (id) => WatchlistEndpoint(id),
    onSuccess: () => {
      setMessage('success')
    }
  })

  const favoriteMutation = useMutation({
    mutationKey: ['add-favorite'],
    mutationFn: (id) => FavoriteEndpoint(id),
    onSuccess: () => {
      setMessage('success')
    }
  })

  return (
    <div className='flex '>
    <div>
        <h1> {movie.title} </h1>

        <img src={movie?.image?.poster} />
    </div>

    <div>
      <MdOutlineWatchLater onClick={() => watchListMutation.mutate(movie._id)} className='cursor-pointer text-[2rem] ' />
      <FaRegHeart onClick={() => favoriteMutation.mutate(movie._id)} className='cursor-pointer text-[2rem] ' />
      {message}
    </div>

    </div>
  )
}

export default MovieParams