import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'

export const Watchlist = () => {

  const [watchlist, setWatclist] = useState([])

  const fetchWatchlist = async () => {
    try{

      const res = await axios.get('/watchlist/get-watchlist-movie')
      setWatclist(res.data.watchlists)

    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWatchlist()
  }, [])

  return (
    <section>
      
      {watchlist.length === 0 ? (
        <div>
          No movies in watchlist
        </div>
      ) : (
        <>
          {watchlist.map((movie) => (
            <div key={movie._id}>
              <h1> {movie.title} </h1>
              <img src={movie.image} alt={movie.title} />
            </div>
          ))}
        </>
      )}

    </section>
  )
}
