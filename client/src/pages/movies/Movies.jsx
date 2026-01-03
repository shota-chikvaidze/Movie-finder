import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetMovieEndpoint } from '../../api/endpoint/movie'
import { Link } from 'react-router-dom'
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { FaStar } from "react-icons/fa";

export const Movies = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    year: '',
    country: '',
    genre: '',
    minRating: ''
  })

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Adventure', 'Family', 'Animation']
  const countries = ['United States of America', 'United Kingdom', 'Japan', 'South Korea', 'France', 'Germany', 'India', 'Canada']
  const years = Array.from({ length: 2026 - 1990 }, (_, i) => 2026 - i)

  const queryParams = {
    page,
    limit: 20,
    type: 'movie',
    ...(searchQuery && { search: searchQuery }),
    ...(filters.genre && { genre: filters.genre }),
    ...(filters.year && { year: filters.year }),
    ...(filters.country && { country: filters.country }),
    ...(filters.minRating && { minRating: filters.minRating })
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-movies', queryParams],
    queryFn: () => GetMovieEndpoint(queryParams)
  })

  const movies = data?.movie || []
  const pagination = data?.pagination || {}

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page])


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const handleSearch = (value) => {
    setSearchQuery(value)
    setPage(1) 
  }

  const clearFilters = () => {
    setFilters({
      year: '',
      country: '',
      genre: '',
      minRating: ''
    })
    setSearchQuery('')
    setPage(1)
  }

  const hasActiveFilters = Object.values(filters).some(val => val) || searchQuery

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1a1d29] via-[#2f3236] to-[#1a1d29] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Discover Movies</h1>
          <p className="text-white/60 text-lg">Find the perfect movie for your mood</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-xl" />
              <input
                type="text"
                placeholder="Search movies by title..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              <FiFilter className="text-xl" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold text-lg">Filter Options</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-400 text-sm hover:text-blue-300 transition flex items-center gap-1"
                  >
                    <MdClose /> Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Genre</label>
                  <select
                    value={filters.genre}
                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-white/30 transition"
                  >
                    <option className='bg-[#33363b]' value="">All genres...</option>
                    {genres.map(genre => (
                      <option className='bg-[#33363b]' key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Year</label>
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-white/30 transition"
                  >
                    <option className='bg-[#33363b]' value="">All years...</option>
                    {years.map(year => (
                      <option className='bg-[#33363b]' key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Country</label>
                  <select
                    value={filters.country}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-white/30 transition"
                  >
                    <option className='bg-[#33363b]' value="">All countries...</option>
                    {countries.map(country => (
                      <option className='bg-[#33363b]' key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Minimum Rating</label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-white/30 transition"
                  >
                    <option className='bg-[#33363b]' value="">Any rating</option>
                    <option className='bg-[#33363b]' value="9"> 9+ </option>
                    <option className='bg-[#33363b]' value="8"> 8+ </option>
                    <option className='bg-[#33363b]' value="7"> 7+ </option>
                    <option className='bg-[#33363b]' value="6"> 6+ </option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-sm flex items-center gap-2">
                Search: {searchQuery}
                <MdClose 
                  className="cursor-pointer hover:text-blue-300" 
                  onClick={() => handleSearch('')}
                />
              </span>
            )}
            {Object.entries(filters).map(([key, value]) => 
              value && (
                <span key={key} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-full text-sm flex items-center gap-2 capitalize">
                  {key}: {value}
                  <MdClose 
                    className="cursor-pointer hover:text-purple-300" 
                    onClick={() => handleFilterChange(key, '')}
                  />
                </span>
              )
            )}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">Failed to load movies. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-white/60">
                {pagination.totalMovies > 0 
                  ? `Showing ${movies.length} of ${pagination.totalMovies} movies` 
                  : 'No movies found'}
              </p>
              {pagination.totalPages > 1 && (
                <p className="text-white/60 text-sm">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <Link 
                  key={movie._id} 
                  to={`/movie/${movie._id}`}
                  className="group relative overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5">
                    <img 
                      src={movie.image?.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                          {movie.title}
                        </h3>
                        {movie.year && (
                          <p className="text-white/70 text-xs">{movie.year}</p>
                        )}
                        {movie.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-yellow-400 text-xs"> <FaStar className='text-[yellow]' /> </span>
                            <span className="text-white text-xs font-medium">{movie.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-white/90 text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition">
                      {movie.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            {movies.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/60 text-lg">No movies found. Try adjusting your filters.</p>
              </div>
            )}

            {pagination.totalPages > 1 && (
              <div className="my-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition flex items-center gap-2"
                >
                  <FiChevronLeft /> Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(pagination.totalPages)].map((_, idx) => {
                    const pageNum = idx + 1
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg transition ${
                            page === pageNum
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return <span key={pageNum} className="text-white/40">...</span>
                    }
                    return null
                  })}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition flex items-center gap-2"
                >
                  Next <FiChevronRight />
                </button>
              </div>
            )}

          </>
        )}
      </div>
    </section>
  )
}
