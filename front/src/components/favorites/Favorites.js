import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'

export const Favorites = () => {

  const [favorites, setFavorites] = useState([])

  const fetchFavorites = async () => {
    try{
      
      const res = await axios.get(`/favorite/get-favorites`)
      setFavorites(res.data.fav)

    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <>
      Favorites

      <section>
        <div>
          {favorites.length === 0 ? (
            <p> No Favorites </p>
          ) : (
            <>
              {favorites.map((fav) => (
                <div key={fav._id}>
                  <h1> {fav.title} </h1>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  )
}
