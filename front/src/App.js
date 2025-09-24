import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './components/authProvider/AuthProvider'

import { Login } from './pages/login/Login'

import { Dashboard } from './pages/dashboard/Dashboard'
import { Movie } from './pages/movie/Movie'
import { Series } from './pages/series/Series'
import { Favorites } from './components/favorites/Favorites'
import { Watchlist } from './components/watchlist/Watchlist'
import MovieDetails from './components/movieDetails/MovieDetails'

import UserLayout from './layout/UserLayout'

function App() {

  const { user, loading } = useAuth();

  if (loading) {
    return <p> Loading... </p>
  }


  return (
    <>

      {!user && (
        <Routes>
          <Route path='/' element={ <Navigate to={'/login'} /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='*' element={ <Navigate to={'/login'} /> } />
        </Routes>
      )}

      {user && (
        <>
          <UserLayout />
          <Routes>
            <Route path='/' element={ <Navigate to={'/dashboard'} /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path='/movies' element={ <Movie /> } />
            <Route path='/series' element={ <Series /> } />
            <Route path='/watchlist' element={ <Watchlist /> } />
            <Route path='/favorites' element={ <Favorites /> } />
            <Route path='/movies/:id' element={ <MovieDetails /> } />

            <Route path='*' element={ <Navigate to={'/dashboard'} /> } />
          </Routes>
        </>
      )}
      
    </>
  );
}

export default App;
