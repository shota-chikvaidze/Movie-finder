import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../../api/axios'

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
  logoutUser: () => {},
})


export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null)
  const [loading, setLoading] = useState(true)

  const setUser = (userData) => {
    setUserState(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logoutUser = () => {
    setUserState(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get('/auth/get-user')
      setUserState(res.data.user)
      localStorage.setItem('user', JSON.stringify(res.data.user))
    } catch (err) {
      console.error(err)
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

   useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserState(JSON.parse(storedUser))
      setLoading(false)
    } else {
      const token = localStorage.getItem('token')
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        fetchUser()
      } else {
        setLoading(false)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
