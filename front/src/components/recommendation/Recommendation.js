import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import './Recommendation.css'

import { FaBookmark } from 'react-icons/fa';


const Recommendation = () => {


  const [recommendation, setRecommendation] = useState([])
  const [slider, setSlider] = useState(0)
    

  const fetchRecom = async () => {
    try{

      const res = await axios.get('/movie/recommendation')
      setRecommendation(res.data.recommendation)

    }catch(err){
      console.error(err)
    }
  }

  const moviesPerPage = 5
  const totalMovies = recommendation.length
  const movieIndex = Math.max(0, Math.ceil(totalMovies / moviesPerPage) - 1)

  const prev = () => {
    if(slider > 0){
      setSlider(slider - 1)
    }
  }

  const next = () => {
    if(slider < movieIndex){
      setSlider(slider + 1)
    }
  }

  useEffect(() => {
    fetchRecom()
  }, [])


  return (
    <section className='recommendation_sect'>
      <div className='recommendation_container'>

        <div className='recom_top'>
          <h2 className='recom_title'> Recommendation for Your taste </h2>
          <div className='recom_btn_wrapper'>
            <button onClick={prev} disabled={slider === 0} className="slider_btn prev_btn">prev</button>
            <button onClick={next} disabled={slider === movieIndex} className="slider_btn next_btn"> next </button>
          </div>
        </div>

        
          {recommendation.length === 0 ? (
            <div className="watchlist_message">
              <FaBookmark className='bookmark_icon'  />
              <p>Save movies to your Watchlist to get personalized recommendations.</p>
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
                  {recommendation.map((recom) => (
                    <div key={recom._id} className='recom_item'>
                      <div className='trending_image_side'>
                        <img src={recom.image} />
                      </div>
                      <div className='trending_text_side'>
                        <h3> {recom.title} </h3>
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

export default Recommendation