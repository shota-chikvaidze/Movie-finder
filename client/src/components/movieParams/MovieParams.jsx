import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetMovieIdEndpoint } from '../../api/endpoint/movie'
import { WatchlistEndpoint } from '../../api/endpoint/watchlist'
import { FavoriteEndpoint } from '../../api/endpoint/favorites'
import { useQuery, useMutation } from '@tanstack/react-query'
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaStar, FaCalendarAlt } from "react-icons/fa";

const MovieParams = () => {

  const { id } = useParams()

  const { data: getMovieId = [] } = useQuery({
    queryKey: ['movie-id'],
    queryFn: () => GetMovieIdEndpoint(id)
  })
  const movie = getMovieId?.movie || {}
  const [message, setMessage] = useState('')
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)


  const watchListMutation = useMutation({
    mutationKey: ['add-watchlist'],
    mutationFn: (id) => WatchlistEndpoint(id),
    onSuccess: () => {
      setMessage('Added to watchlist!')
      setIsWatchlisted(true)
      setTimeout(() => setMessage(''), 3000)
    }
  })

  const favoriteMutation = useMutation({
    mutationKey: ['add-favorite'],
    mutationFn: (id) => FavoriteEndpoint(id),
    onSuccess: () => {
      setMessage('Added to favorites!')
      setIsFavorited(true)
      setTimeout(() => setMessage(''), 3000)
    }
  })

  if (!movie.title) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-xl text-gray-400'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'>
      {movie?.image?.backdrop && (
        <div className='relative h-[500px] w-full overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10' />
          <img 
            src={movie.image.backdrop} 
            alt={movie.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-80 relative z-20'>
        <div className='flex flex-col lg:flex-row gap-8'>
          
          <div className='flex-shrink-0'>
            <div className='relative group'>
              <img 
                src={movie?.image?.poster} 
                alt={movie.title}
                className='w-full lg:w-80 rounded-xl shadow-2xl border-4 border-gray-700/50 transition-transform duration-300 group-hover:scale-105'
              />
              {movie.ageRating && (
                <div className='absolute top-4 right-4 bg-yellow-500 text-black font-bold px-3 py-1 rounded-lg text-sm'>
                  {movie.ageRating}
                </div>
              )}
            </div>
          </div>

          <div className='flex-1 text-white'>

            <div className='mb-6'>
              <h1 className='text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg'>
                {movie.title}
              </h1>
              
              <div className='flex flex-wrap items-center gap-4 mb-4 text-gray-300'>
                <div className='flex items-center gap-2'>
                  <FaCalendarAlt className='text-yellow-500' />
                  <span className='text-lg'>{movie.releaseYear}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <IoMdTime className='text-yellow-500 text-xl' />
                  <span className='text-lg'>{movie.runtime} min</span>
                </div>
                <div className='flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full'>
                  <FaStar />
                  <span className='font-bold'>{movie.rating?.toFixed(1)}</span>
                </div>
                {movie.popularity && (
                  <div className='text-gray-400 text-sm'>
                    Popularity: {movie.popularity?.toFixed(1)}
                  </div>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-6'>
                  {movie.genres.map((genre, index) => (
                    <span 
                      key={index}
                      className='bg-gray-700/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors'
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className='flex gap-4 items-center mb-6'>
                <button
                  onClick={() => watchListMutation.mutate(movie._id)}
                  disabled={watchListMutation.isPending}
                  className='cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105'
                >
                  {isWatchlisted ? <MdWatchLater className='text-2xl' /> : <MdOutlineWatchLater className='text-2xl' />}
                  <span>Watchlist</span>
                </button>
                
                <button
                  onClick={() => favoriteMutation.mutate(movie._id)}
                  disabled={favoriteMutation.isPending}
                  className='cursor-pointer flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105'
                >
                  {isFavorited ? <FaHeart className='text-xl' /> : <FaRegHeart className='text-xl' />}
                  <span>Favorite</span>
                </button>

                {message && (
                  <div className='bg-green-500 text-white px-4 py-2 rounded-lg animate-pulse'>
                    {message}
                  </div>
                )}
              </div>
            </div>

            {movie.overview && (
              <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-3 text-yellow-500'>Overview</h2>
                <p className='text-gray-300 text-lg leading-relaxed'>
                  {movie.overview}
                </p>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              
              {movie.director && (
                <div className='bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700'>
                  <h3 className='text-yellow-500 font-semibold mb-2 text-lg'>Director</h3>
                  <p className='text-gray-200 text-lg'>{movie.director}</p>
                </div>
              )}

              {movie.writers && movie.writers.length > 0 && (
                <div className='bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700'>
                  <h3 className='text-yellow-500 font-semibold mb-2 text-lg'>Writers</h3>
                  <p className='text-gray-200'>{movie.writers.join(', ')}</p>
                </div>
              )}

              {movie.countries && movie.countries.length > 0 && (
                <div className='bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700'>
                  <h3 className='text-yellow-500 font-semibold mb-2 text-lg'>Countries</h3>
                  <p className='text-gray-200'>{movie.countries.join(', ')}</p>
                </div>
              )}
            </div>

            {movie.cast && movie.cast.length > 0 && (
              <div className='bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700'>
                <h2 className='text-2xl font-bold mb-4 text-yellow-500'>Cast</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                  {movie.cast.map((actor, index) => (
                    <div 
                      key={index}
                      className='bg-gray-700/50 px-3 py-2 rounded-lg text-center hover:bg-gray-600/50 transition-colors'
                    >
                      <p className='text-gray-200 text-sm flex items-center justify-center h-full font-medium'>{actor}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className='h-20'></div>
    </div>
  )
}

export default MovieParams