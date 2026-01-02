import React from 'react'
import { RecommendationEndpoint, TrendingEndpoint } from '../../api/endpoint/movie'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { FaFire, FaStar, FaCalendarAlt, FaLightbulb } from 'react-icons/fa'
import { IoMdTime, IoMdTrendingUp } from 'react-icons/io'
import { MdRecommend } from 'react-icons/md'

export const Recom = () => {

  const { data: trendingData = [], isLoading: trendingLoading } = useQuery({
    queryKey: ['get-trending'],
    queryFn: () => TrendingEndpoint()
  })


  const { data: recommendationData = [], isLoading: recomLoading } = useQuery({
    queryKey: ['get-recom'],
    queryFn: () => RecommendationEndpoint()
  })

  const trending = trendingData.trending || []
  const recom = recommendationData.recommendation || []

  return (
    <section className='min-h-screen  py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        
        <div className='text-center mb-16'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <h1 className='text-5xl font-bold text-white'>Trending & Recommendations</h1>
          </div>
          <p className='text-gray-400 text-lg'>Discover what's hot and personalized picks just for you</p>
        </div>

        <div className='mb-20'>
          <div className='flex items-center gap-3 mb-8'>
            <IoMdTrendingUp className='text-4xl text-orange-500' />
            <h2 className='text-4xl font-bold text-white'>Trending Now</h2>
            <div className='flex-1 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full'></div>
          </div>

          {trendingLoading ? (
            <div className='flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500'></div>
            </div>
          ) : trending.length === 0 ? (
            <div className='text-center py-16 bg-gray-800/30 rounded-2xl border border-orange-500/20'>
              <FaFire className='text-6xl text-orange-500/30 mx-auto mb-4' />
              <p className='text-gray-400 text-lg'>No trending movies available</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
              {trending.map((movie, index) => (
                <Link 
                  to={`/movie/${movie._id}`}
                  key={movie._id}
                  className='group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-orange-500/20 hover:border-orange-500/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20'
                >
                  <div className='absolute top-3 left-3 z-10 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 shadow-lg'>
                    <FaFire /> #{index + 1}
                  </div>

                  <div className='relative aspect-[2/3] overflow-hidden bg-gray-700'>
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
                    
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>

                    {movie.rating && (
                      <div className='absolute top-3 right-3 bg-orange-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 font-bold shadow-lg'>
                        <FaStar className='text-yellow-300' />
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className='p-4'>
                    <h3 className='text-white font-bold text-base mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors'>
                      {movie.title}
                    </h3>
                    
                    <div className='flex flex-wrap gap-2 text-sm text-gray-400 mb-2'>
                      {movie.releaseYear && (
                        <div className='flex items-center gap-1'>
                          <FaCalendarAlt className='text-orange-400' />
                          <span>{movie.releaseYear}</span>
                        </div>
                      )}
                      {movie.runtime && (
                        <div className='flex items-center gap-1'>
                          <IoMdTime className='text-orange-400' />
                          <span>{movie.runtime}m</span>
                        </div>
                      )}
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                      <div className='flex flex-wrap gap-1'>
                        {movie.genres.slice(0, 2).map((genre, idx) => (
                          <span 
                            key={idx}
                            className='bg-orange-600/30 text-orange-300 px-2 py-0.5 rounded text-xs font-medium border border-orange-500/30'
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className='flex items-center gap-3 mb-8'>
            <MdRecommend className='text-4xl text-purple-400' />
            <h2 className='text-4xl font-bold text-white'>Recommended For You</h2>
            <div className='flex-1 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full'></div>
          </div>

          {recomLoading ? (
            <div className='flex justify-center items-center py-20'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500'></div>
            </div>
          ) : recom.length === 0 ? (
            <div className='text-center py-16 bg-gray-800/30 rounded-2xl border border-purple-500/20'>
              <FaLightbulb className='text-6xl text-purple-500/30 mx-auto mb-4' />
              <p className='text-gray-400 text-lg mb-4'>No recommendations available yet</p>
              <p className='text-gray-500 text-sm'>Start rating movies to get personalized recommendations!</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {recom.map((movie, index) => (
                <Link 
                  to={`/movie/${movie._id}`}
                  key={movie._id}
                  className='group bg-gradient-to-r from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20'
                >
                  <div className='flex flex-col md:flex-row'>
                    <div className='relative md:w-48 aspect-[2/3] md:aspect-auto flex-shrink-0 overflow-hidden bg-gray-700'>
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
                      
                      <div className='absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 shadow-lg'>
                        <FaLightbulb /> #{index + 1}
                      </div>

                      {movie.rating && (
                        <div className='absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full flex items-center gap-1 font-bold shadow-lg'>
                          <FaStar className='text-yellow-300' />
                          <span>{movie.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    <div className='flex-1 p-6'>
                      <h3 className='text-white font-bold text-xl mb-3 group-hover:text-purple-400 transition-colors'>
                        {movie.title}
                      </h3>
                      
                      <div className='flex flex-wrap gap-4 mb-4 text-gray-400'>
                        {movie.releaseYear && (
                          <div className='flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full'>
                            <FaCalendarAlt className='text-purple-400' />
                            <span>{movie.releaseYear}</span>
                          </div>
                        )}
                        {movie.runtime && (
                          <div className='flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full'>
                            <IoMdTime className='text-purple-400' />
                            <span>{movie.runtime} min</span>
                          </div>
                        )}
                        {movie.ageRating && (
                          <div className='bg-purple-600/80 text-white px-3 py-1 rounded-full font-bold'>
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
                          {movie.genres.map((genre, idx) => (
                            <span 
                              key={idx}
                              className='bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/40 hover:bg-purple-600/50 transition-colors'
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
