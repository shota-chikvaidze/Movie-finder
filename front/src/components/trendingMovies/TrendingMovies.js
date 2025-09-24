import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import './TrendingMovies.css'

const TrendingMovies = () => {

  const [slider, setSlider] = useState(0)
  const [trending, setTrending] = useState([])


  const fetchTrending = async () => {
    try{

      const res = await axios.get('/movie/trending')
      setTrending(res.data.trending)
      
    }catch(err) {
      console.error(err)
    }
  }

  const perPageMovies = 2
  const totalTrendingMovies = trending.length
  const maxIndex = Math.max(0, Math.ceil(totalTrendingMovies / perPageMovies) - 1)

  const prev = () => {
    if(slider > 0){
      setSlider(slider - 1)
    }
  }
  
  const next = () => {
    if(slider < maxIndex){
      setSlider(slider + 1)
    }
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  return (
    <section className='recommendation_sect'>
      <div className='recommendation_container'>

        <div className='recom_top'>
          <h1 className='recom_title'> Trending movies </h1>
          <div className='recom_btn_wrapper'>
            <button onClick={prev} disabled={slider === 0} className="slider_btn prev_btn">prev</button>
            <button onClick={next} disabled={slider === maxIndex} className="slider_btn next_btn"> next </button>
          </div>
        </div>

        
          {trending.length === 0 ? (
            <div className="watchlist_message">
              <h3> No trending movies  </h3>
            </div>
          ) :  (
            <div className="slider_wrapper">
            
              <div className="slider_viewport">
                <div
                  className="slider_track"
                  style={{
                    transform: `translateX(-${slider * 275}px)`,
                  }}
                >
                  {trending.map((trend) => (
                    <div key={trend._id} className='trend_item'>
                      <div className='trending_image_side'>
                        <img src={trend.image} />
                      </div>
                      <div className='trending_text_side'>
                        <h3> {trend.title} </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                
            </div>
          )}

          
      </div>
    </section>
  )
}

export default TrendingMovies