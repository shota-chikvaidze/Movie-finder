import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetFavoriteEndpoint } from '../../api/endpoint/favorites'

export const Favorites = () => {

    const { data } = useQuery({
        queryKey: ['get-favorites'],
        queryFn: () => GetFavoriteEndpoint()
    })

    const favorites = data?.fav || []

  return (
    <div>

        {favorites.map((watch) => (
            <div key={watch._id}>
                {watch.title}
            </div>
        ))}

    </div>
  )
}
