import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetFavoriteEndpoint } from '../../api/endpoint/favorites'
import { Link } from 'react-router-dom'
import { FaHeart, FaStar, FaPlay } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'

export const Favorites = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['get-favorites'],
        queryFn: () => GetFavoriteEndpoint()
    })

    const favorites = data?.fav || []

    if(isLoading) {
      return (
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-2xl text-rose-400 animate-pulse'>Loading your favorites...</div>
        </div>
      )
    }

  return (
    <div className='min-h-screen bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-12 '>
          <div className='flex items-center gap-4 mb-4'>
            <FaHeart className='text-5xl text-rose-400 animate-pulse' />
            <h1 className='text-5xl font-bold text-white'>My Favorites</h1>
          </div>
          <p className='text-gray-400 text-lg'>
            {favorites.length === 0 ? 'No favorites yet' : `${favorites.length} favorite movie${favorites.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <FaHeart className='text-9xl text-rose-400/20 mb-6' />
            <h2 className='text-2xl text-gray-400 mb-4'>No favorites yet</h2>
            <p className='text-gray-500 mb-6'>Start adding movies you love to your favorites!</p>
            <Link 
              to='/movies'
              className='bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2'
            >
              <FaHeart /> Find Movies to Favorite
            </Link>
          </div>
        ) : (
          <div className='space-y-6'>
            {favorites.map((movie) => (
              <div 
                key={movie._id}
                className='group bg-gradient-to-r from-gray-800/50 to-rose-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-rose-500/20 hover:border-rose-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/20'
              >
                <div className='flex flex-col md:flex-row'>
                  <Link 
                    to={`/movie/${movie._id}`}
                    className='relative md:w-48 aspect-[2/3] md:aspect-auto flex-shrink-0 overflow-hidden bg-gray-700'
                  >
                    {movie?.image?.poster ? (
                      <img 
                        src={movie.image.poster} 
                        alt={movie.title}
                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-600'>
                        No Image
                      </div>
                    )}
                    
                    <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                      <FaPlay className='text-5xl text-rose-400' />
                    </div>

                    {movie.rating && (
                      <div className='absolute top-3 right-3 bg-rose-600 text-white px-3 py-1 rounded-full flex items-center gap-1 font-bold shadow-lg'>
                        <FaStar className='text-yellow-300' />
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </Link>

                  <div className='flex-1 p-6'>
                    <Link to={`/movie/${movie._id}`}>
                      <h3 className='text-white font-bold text-2xl mb-3 group-hover:text-rose-400 transition-colors'>
                        {movie.title}
                      </h3>
                    </Link>
                    
                    <div className='flex flex-wrap gap-4 mb-4 text-gray-400'>
                      {movie.releaseYear && (
                        <div className='flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full'>
                          <MdDateRange className='text-rose-400' />
                          <span>{movie.releaseYear}</span>
                        </div>
                      )}
                      {movie.runtime && (
                        <div className='flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full'>
                          <BiTime className='text-rose-400' />
                          <span>{movie.runtime} min</span>
                        </div>
                      )}
                      {movie.ageRating && (
                        <div className='bg-rose-600/80 text-white px-3 py-1 rounded-full font-bold'>
                          {movie.ageRating}
                        </div>
                      )}
                    </div>

                    {movie.overview && (
                      <p className='text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed'>
                        {movie.overview}
                      </p>
                    )}

                    {movie.genres && movie.genres.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {movie.genres.map((genre, index) => (
                          <span 
                            key={index}
                            className='bg-rose-600/30 text-rose-300 px-3 py-1 rounded-full text-sm font-medium border border-rose-500/40 hover:bg-rose-600/50 transition-colors'
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className='mt-4 space-y-2 text-sm'>
                      {movie.director && (
                        <div className='text-gray-400'>
                          <span className='text-rose-400 font-semibold'>Director:</span> {movie.director}
                        </div>
                      )}
                      {movie.cast && movie.cast.length > 0 && (
                        <div className='text-gray-400'>
                          <span className='text-rose-400 font-semibold'>Cast:</span> {movie.cast.slice(0, 4).join(', ')}
                          {movie.cast.length > 4 && <span className='text-gray-500'> +{movie.cast.length - 4} more</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
