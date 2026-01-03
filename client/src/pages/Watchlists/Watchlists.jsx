import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GetWatchlistEndpoint, DeleteWatchlistEndpoint } from '../../api/endpoint/watchlist'
import { Link } from 'react-router-dom'
import { MdWatchLater, MdRemoveRedEye } from 'react-icons/md'
import { FaStar, FaCalendarAlt } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { RxCross1 } from "react-icons/rx";

export const Watchlists = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['get-watchlist'],
        queryFn: () => GetWatchlistEndpoint()
    })

    const watchlist = data?.watchlists || []

    const [deletePopup, setDeletePopup] = useState(false)
    const [movieToDelete, setMovieToDelete] = useState(null)
    const qc = useQueryClient()


    const deleteWatchlist = useMutation({
      mutationKey: ['delete-watchlist'],
      mutationFn: (id) => DeleteWatchlistEndpoint(id),
      onSuccess: () => {
        setDeletePopup(false)
        qc.invalidateQueries({ queryKey: ['get-watchlist'] })
      }
    })


    if(isLoading) {
      return (
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-2xl text-blue-400 animate-pulse'>Loading your watchlist...</div>
        </div>
      )
    }

  return (
    <div className='min-h-screen  py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>

        <div className='mb-12'>
          <div className='flex items-center gap-4 mb-4'>
            <MdWatchLater className='text-5xl text-blue-400' />
            <h1 className='text-5xl font-bold text-white'>My Watchlist</h1>
          </div>
          <p className='text-gray-400 text-lg'>
            {watchlist.length === 0 ? 'Your watchlist is empty' : `${watchlist.length} movie${watchlist.length !== 1 ? 's' : ''} to watch`}
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <MdWatchLater className='text-9xl text-blue-400/20 mb-6' />
            <h2 className='text-2xl text-gray-400 mb-4'>No movies in your watchlist yet</h2>
            <p className='text-gray-500 mb-6'>Start adding movies you want to watch later!</p>
            <Link 
              to='/movies'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105'
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {watchlist.map((movie) => (
              <div key={movie._id} className='group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20'>
                <Link to={`/movie/${movie._id}`} >
                  <div className='relative aspect-[2/3] overflow-hidden bg-slate-700'>
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

                    <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                      <MdRemoveRedEye className='text-6xl text-blue-400' />
                    </div>

                    {movie.rating && (
                      <div className='absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 font-bold shadow-lg'>
                        <FaStar className='text-yellow-400' />
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </Link>

                <Link to={`/movie/${movie._id}`} >
                  <div className='p-4'>
                    <h3 className='text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors'>
                      {movie.title}
                    </h3>
                    
                    <div className='flex flex-wrap gap-3 text-sm text-gray-400 mb-3'>
                      {movie.releaseYear && (
                        <div className='flex items-center gap-1'>
                          <FaCalendarAlt className='text-blue-400' />
                          <span>{movie.releaseYear}</span>
                        </div>
                      )}
                      {movie.runtime && (
                        <div className='flex items-center gap-1'>
                          <IoMdTime className='text-blue-400' />
                          <span>{movie.runtime} min</span>
                        </div>
                      )}
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                      <div className='flex flex-wrap gap-1'>
                        {movie.genres.slice(0, 2).map((genre, index) => (
                          <span 
                            key={index}
                            className='bg-blue-600/30 text-blue-300 px-2 py-1 rounded text-xs font-medium border border-blue-500/30'
                          >
                            {genre}
                          </span>
                        ))}
                        {movie.genres.length > 2 && (
                          <span className='text-gray-500 text-xs px-2 py-1'>+{movie.genres.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeletePopup(true)
                    setMovieToDelete(movie)
                  }}
                  className='absolute top-3 left-3 px-2 py-2 text-xs font-medium bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all flex items-center gap-1 shadow-lg cursor-pointer'
                >
                  <RxCross1 className='text-[12px]' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {deletePopup && movieToDelete && (
        <div className='fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200' onClick={() => setDeletePopup(false)}>
          <div className='rounded-2xl bg-black/40 p-6 max-w-md w-full shadow-2xl border border-rose-500/30 animate-in zoom-in duration-200' onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col items-center text-center'>
              
              <h2 className='text-2xl font-bold text-white mb-2'>Remove from Favorites?</h2>
              <p className='text-gray-400 mb-6'>
                Are you sure you want to remove <span className='text-rose-400 font-semibold'>"{movieToDelete.title}"</span> from your favorites?
              </p>

              <div className='flex gap-3 w-full'>
                <button
                  onClick={() => setDeletePopup(false)}
                  className='flex-1 px-6 py-3 bg-gray-700 cursor-pointer hover:bg-gray-600 text-white rounded-lg font-semibold transition-all hover:scale-105'
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteWatchlist.mutate(movieToDelete._id)}
                  disabled={deleteWatchlist.isPending}
                  className='flex-1 px-6 py-3 bg-rose-600 cursor-pointer hover:bg-rose-700 text-white rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {deleteWatchlist.isPending ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
