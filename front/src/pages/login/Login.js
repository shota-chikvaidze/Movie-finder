import React, { useState } from 'react'
import axios from '../../api/axios'
import { useAuth } from '../../components/authProvider/AuthProvider'
import { GoogleLogin } from '@react-oauth/google'
import './Login.css'

export const Login = () => {
  
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{

      let res
      if(isLogin){
        res = await axios.post('/auth/login', {
          email: form.email,
          password: form.password,
        })
      }else{
        res = await axios.post('/auth/register', form)
      }

      if(res.status === 200 || res.status === 201){
        if(res.data.token){
          localStorage.setItem('token', res.data.token)
          window.location.href = '/'
        }
      }

    }catch(err){
      console.error('error', err)
    }
  }

  if(loading){
    <p> Loading... </p>
  }

  const handleGoogle = async (credentialResponse) => {
    try{

      const token = credentialResponse.credential
      const res = await axios.post('http://localhost:5000/api/auth/google', { token } )
      console.log(res.data) 

      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);

    }catch(err){
      console.error(err);
    }
  }

  return (
    <section className='auth_section'>
      <div className='auth_container'>

      <form onSubmit={handleSubmit} className='login_form'>

        <h2 className='login_title'> {isLogin ? 'Login' : 'Register'} </h2>

        <GoogleLogin 
          onSuccess={handleGoogle} 
          onError={() => console.log('Login failed')} 
          text={isLogin ? 'signin_with' : 'continue_with'}
        />

        {!isLogin && (

          <input 
            name='username' 
            type='text' 
            onChange={handleChange} 
            required 
            placeholder='Enter username' 
          />

        )}

        <input 
          name='email' 
          type='email' 
          onChange={handleChange}
          required 
          placeholder='Enter email' 
        />

        <input 
          name='password' 
          type='password' 
          onChange={handleChange} 
          required 
          placeholder='Enter password' 
        />

        <button type='submit'> {isLogin ? 'Login' : 'Register'} </button>

      </form>
      
      <p className="toggle_text">
        {isLogin ? (
          <>
            Don’t have an account?
            <span onClick={() => setIsLogin(false)} className="toggle-link">
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?
            <span onClick={() => setIsLogin(true)} className="toggle-link">
              Login
            </span>
          </>
        )}
      </p>


      </div>
    </section>
  )
}
