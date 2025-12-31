import React from 'react'
import { RiMovie2AiLine } from "react-icons/ri";
import { FiTv } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

export const Home = () => {

  const navigate = useNavigate()

  return (
    <section className='w-full h-full max-h-[100vh]  '>
      <div className='flex justify-between h-full '>

        <div onClick={() => navigate('/movies')} className='paragraph_wrapper w-full flex flex-col justify-center items-center tranition duration-400 cursor-pointer h-full max-h-[100vh] min-h-[100vh] hover:bg-white/10 gap-2 '>
          <RiMovie2AiLine className='home_icon' />
          <h2 className='text-white/70 text-[1.9rem] font-[900] select-none ' >Find movies</h2>
          <p className='paragraph text-white/70 text-[14px] font-[300] text-center max-w-[400px] '>Discover and explore movies across genres, years, and ratings. Find trending titles, hidden gems, and build your watchlist easily.</p>
        </div>

        <div onClick={() => navigate('/series')} className='paragraph_wrapper w-full flex flex-col justify-center items-center tranition duration-400 cursor-pointer h-full max-h-[100vh] min-h-[100vh] hover:bg-white/10 gap-2 '> 
          <FiTv className='home_icon' />
          <h2 className='text-white/70 text-[1.9rem] font-[900] select-none ' >Find series</h2>
          <p className='paragraph text-white/70 text-[14px] font-[300] text-center max-w-[400px] '>Browse and track TV series with seasons, episodes, and ratings. Follow ongoing shows or discover completed series in one place.</p>
        </div>
        
        <div onClick={() => navigate('/recommendations')} className='paragraph_wrapper w-full flex flex-col justify-center items-center tranition duration-400 cursor-pointer h-full max-h-[100vh] min-h-[100vh] hover:bg-white/10 gap-2 '> 
          <FaRegStar className='home_icon' />
          <h2 className='text-white/70 text-[1.9rem] font-[900] select-none ' >Recommendation</h2>
          <p className='paragraph text-white/70 text-[14px] font-[300] text-center max-w-[400px] '>Get personalized movie and series suggestions based on your taste, ratings, and activity — so you always know what to watch next.</p>
        </div>

      </div>
    </section>
  )
}
