import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetMovieEndpoint } from '../../api/endpoints/movie'

export const Movies = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-movies'],
    queryFn: () => GetMovieEndpoint()
  })

  const movies = data?.movie || []
  console.log(data)

  return (
    <section>
      
      {movies.map((movie) => (
        <div>
          {movie.title}

          <img src={movie.image.poster} />
        </div>
      ))}

    </section>
  )
}
