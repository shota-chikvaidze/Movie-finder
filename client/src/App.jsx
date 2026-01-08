import React from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserAuthStore } from './store/UserAuthStore'
import { FetchMe } from './hooks/FetchUser'

import { Login } from "./pages/login/Login"
import { AuthSuccess } from "./components/authSuccess/AuthSuccess"

import { Home } from './pages/home/Home'
import { Movies } from "./pages/movies/Movies"
import { Series } from "./pages/series/Series"
import { Recom } from "./pages/recom/Recom"
import { Watchlists } from "./pages/Watchlists/Watchlists"
import { Favorites } from "./pages/favorites/Favorites"
import MovieParams from './components/movieParams/MovieParams'

import Navbar from './layout/Navbar'

const MainLayout = ({ children, noPadding = false }) => (
  <>
    <Navbar />
    <div className={noPadding ? '' : 'pt-[80px]'}>
      {children}
    </div>
  </>
)

function App() {
  const { isLoading } = FetchMe()
  const user = UserAuthStore((s) => s.user)
  const isInitialized = UserAuthStore((s) => s.isInitialized)

  if(isLoading || !isInitialized) {
    return <p className="text-white/70 flex justify-center items-center h-[100vh]">Loading...</p>
  }

  return (
    <Routes>
      
      {!user ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/" element={<MainLayout noPadding><Home /></MainLayout>} />
          <Route path="/movies" element={<MainLayout><Movies /></MainLayout>} />
          <Route path="/movie/:id" element={<MainLayout><MovieParams /></MainLayout>} />
          <Route path="/series" element={<MainLayout><Series /></MainLayout>} />
          <Route path="/watchlists" element={<MainLayout><Watchlists /></MainLayout>} />
          <Route path="/favorites" element={<MainLayout><Favorites /></MainLayout>} />
          <Route path="/recommendations" element={<MainLayout><Recom /></MainLayout>} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  )
}

export default App