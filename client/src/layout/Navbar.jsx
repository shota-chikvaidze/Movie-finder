import React, { useEffect, useState } from 'react'
import { UserAuthStore } from '../store/UserAuthStore'
import { useMutation } from '@tanstack/react-query'
import { LogoutEndpoint } from '../api/endpoint/auth'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => LogoutEndpoint()
  })

  const clearAuth = () => {
    mutation.mutate()
    UserAuthStore.getState().clearAuth()
  }


  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); 
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

  }, []) 

  return (
    <header className={`flex justify-center fixed z-40 top-0 left-0 w-full h-[70px] transition-all duration-300 ${isScrolled ? 'bg-[#1E201E]/30 backdrop-blur-md shadow-md' : 'bg-transparent'}`} >
      <div className='flex justify-between items-center h-full w-full max-w-7xl  '>

        <div>
          <Link to={'/'}>
            <h1 className=' text-white/70 text-[2rem] font-bold '>mFinder</h1>
          </Link>
        </div>
        
        <ul className='flex gap-4'>
          <li> <Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg ' to={'/'} > Home </Link> </li>
          <li> <Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg ' to={'/movies'} > Movies </Link> </li>
          <li> <Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg ' to={'/series'} > Series </Link> </li>
          <li> <Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg ' to={'/favorites'} > Favorites </Link> </li>
          <li> <Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg ' to={'/watchlists'} > Whatchlist </Link> </li>
        </ul>
        

        <div>
          <button className='text-[red] px-[19px] py-[8px] transition duration-300 cursor-pointer hover:bg-white/10 rounded-lg ' onClick={clearAuth}> Logout </button>
        </div>

      </div>
    </header>
  )
}

export default Navbar