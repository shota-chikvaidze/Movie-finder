import React from 'react'
import './UserLayout.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/authProvider/AuthProvider';

import { IoIosLogOut } from "react-icons/io";

const UserLayout = () => {

    const { logoutUser } = useAuth()

  return (
    <header>
        <div className='header_wrapper'>

            <div>
                <Link to={'/'}>
                    <h1 className='webLogo'>mFinder</h1>
                </Link>
            </div>
            <ul className='links_wrapper'>
                <li> <Link to={'/movies'} className='navbar_link'>Movies</Link> </li>
                <li> <Link to={'/series'} className='navbar_link'>Series</Link> </li>
                <li> <Link to={'/watchlist'} className='navbar_link'>Watchlist</Link> </li>
                <li> <Link to={'/favorites'} className='navbar_link'>Favorites</Link> </li>
            </ul>
            <div>
                <button className='logout_wrapper' onClick={logoutUser}>
                    <IoIosLogOut className='logout_icon' />
                    Logout
                </button>
            </div>

        </div>
    </header>
  )
}

export default UserLayout