import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetWatchlistEndpoint } from '../../api/endpoint/watchlist'

export const Watchlists = () => {

    const { data } = useQuery({
        queryKey: ['get-watchlist'],
        queryFn: () => GetWatchlistEndpoint()
    })

    const watchlist = data?.watchlists || []

  return (
    <div>

        {watchlist.map((watch) => (
            <div key={watch._id}>
                {watch.title}
            </div>
        ))}

    </div>
  )
}
