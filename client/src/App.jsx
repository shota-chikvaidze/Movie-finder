import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserAuthStore } from './store/UserAuthStore'
import { FetchMe } from './hooks/FetchUser'

import { Login } from "./pages/login/Login"

import { Home } from './pages/home/Home'
import { Movies } from "./pages/movies/Movies"
import { Series } from "./pages/series/Series"
import { Recom } from "./pages/recom/Recom"

import Navbar from './layout/Navbar'


function App() {

  
  const { isLoading } = FetchMe()
  const user = UserAuthStore((s) => s.user)

  if(isLoading) {
    return <p className="text-white/70 flex justify-center items-center h-[100vh]">Loading...</p>
  }

  return (
    <>

      {!user && (
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="*" element={ <Navigate to={'/'} /> } />
        </Routes>
      )}

      {user && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/movies" element={ <Movies /> } />
            <Route path="/series" element={ <Series /> } />
            <Route path="/recommendations" element={ <Recom /> } />
            <Route path="*" element={ <Navigate to={'/'} /> } />
          </Routes>
        </>
      )}

    </>
  )
}

export default App