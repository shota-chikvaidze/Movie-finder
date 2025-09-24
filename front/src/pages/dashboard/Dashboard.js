import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

import { RiMovie2Line } from "react-icons/ri";
import { FiTv } from "react-icons/fi";


export const Dashboard = () => {
  return (
    <section className='dashboard_sect'>
      <div className='dashboard_container'>
        <Link to={'/movies'} className='link_wrapper'>
          <div className='dashboard_left'>
            <RiMovie2Line className='movie_icon' />
            <h3>Find movies</h3>
            <p> Discover movies tailored to your taste. Filter by genre, rating, or mood and find the perfect film to watch tonight. </p>
          </div>
        </Link>

        <Link to={'/series'} className='link_wrapper'>
          <div className='dashboard_right'>
            <FiTv className='series_icon' />
            <h3>Find series</h3>
            <p> Browse TV shows and web series to find your next binge. Filter by genre, popularity, or rating for easy discovery. </p>
          </div>
        </Link>

      </div>
    </section>
  )
}
