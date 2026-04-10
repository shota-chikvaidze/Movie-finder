import React, { useEffect, useState } from 'react'
import { UserAuthStore } from '../store/UserAuthStore'
import { useMutation } from '@tanstack/react-query'
import { LogoutEndpoint } from '../api/endpoint/auth'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { showSuccessToast, showErrorToast } from '../utils/toastConfig'

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const user = UserAuthStore((s) => s.user)

  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => LogoutEndpoint(),
    onSuccess: (data) => {
      showSuccessToast(data.message || "Logged out successfully!")
    },
    onError: (error) => {
      showErrorToast(error?.response?.data?.message || "Error occurred")
    }
  })

  const clearAuth = () => {
    mutation.mutate()
    UserAuthStore.getState().clearAuth()
  }


  const navigateLogin = () => {
    navigate('/login')
    setMenuOpen(false)
  }


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed z-40 top-0 left-0 w-full h-[70px] transition-all duration-300 ${isScrolled ? 'bg-[#1E201E]/30 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className='flex justify-between items-center h-full w-full max-w-7xl mx-auto px-4'>

        <div>
          <Link to={'/'}>
            <h1 className='text-white/70 text-[2rem] font-bold'>mFinder</h1>
          </Link>
        </div>

        <ul className='hidden md:flex gap-4'>
          <li><Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg' to={'/'}>Home</Link></li>
          <li><Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg' to={'/movies'}>Movies</Link></li>
          <li><Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg' to={'/series'}>Series</Link></li>
          <li><Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg' to={'/favorites'}>Favorites</Link></li>
          <li><Link className='text-white/70 text-[17px] transition duration-300 p-[7px] hover:bg-white/10 rounded-lg' to={'/watchlists'}>Whatchlist</Link></li>
        </ul>

        <div className='hidden md:block'>

          {user ? (
            <button 
              className='text-[red] px-[19px] py-[8px] transition duration-300 cursor-pointer hover:bg-white/10 rounded-lg' 
              onClick={clearAuth}
            >
                Logout
            </button>
          ) : (
            <Link to={'/login'}>
              <button 
                className='bg-red-500 text-white px-[19px] py-[8px] cursor-pointer hover:bg-red-600 rounded-lg' 
                >
                  Register
              </button>
            </Link>
          )}
          
        </div>

        <button
          className='md:hidden text-white/70 p-2 hover:bg-white/10 rounded-lg transition'
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <FiX className='text-2xl' /> : <FiMenu className='text-2xl' />}
        </button>

      </div>

      {menuOpen && (
        <div className='md:hidden absolute top-[70px] left-0 w-full bg-[#1E201E]/95 backdrop-blur-md border-t border-white/10 shadow-lg'>
          <ul className='flex flex-col px-4 py-3 gap-1'>
            <li><Link className='text-white/70 text-[16px] transition duration-300 px-3 py-2 hover:bg-white/10 rounded-lg block' to={'/'} onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link className='text-white/70 text-[16px] transition duration-300 px-3 py-2 hover:bg-white/10 rounded-lg block' to={'/movies'} onClick={() => setMenuOpen(false)}>Movies</Link></li>
            <li><Link className='text-white/70 text-[16px] transition duration-300 px-3 py-2 hover:bg-white/10 rounded-lg block' to={'/series'} onClick={() => setMenuOpen(false)}>Series</Link></li>
            <li><Link className='text-white/70 text-[16px] transition duration-300 px-3 py-2 hover:bg-white/10 rounded-lg block' to={'/favorites'} onClick={() => setMenuOpen(false)}>Favorites</Link></li>
            <li><Link className='text-white/70 text-[16px] transition duration-300 px-3 py-2 hover:bg-white/10 rounded-lg block' to={'/watchlists'} onClick={() => setMenuOpen(false)}>Whatchlist</Link></li>
            <li className='pt-2 border-t border-white/10 mt-2'>

              {user ? (
                <button 
                  className='text-[red] px-3 py-2 transition duration-300 cursor-pointer hover:bg-white/10 rounded-lg w-full text-left' 
                  onClick={() => { clearAuth(); setMenuOpen(false) }}
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={navigateLogin}
                  className='bg-red-500 text-white px-[19px] py-[8px] cursor-pointer hover:bg-red-600 rounded-lg' 
                  >
                    Register
                </button>
              )}
                
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
