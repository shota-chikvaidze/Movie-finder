import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { GoogleEndpoint, LoginEndpoint, RegisterEndpoint } from '../../api/endpoint/auth'
import { useNavigate } from 'react-router-dom'
import { UserAuthStore } from '../../store/UserAuthStore'

export const Login = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [isLogin, setIsLogin] = useState(true)
    const setAuth = UserAuthStore((s) => s.setAuth)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const loginMutate = useMutation({
        mutationKey: ['login'],
        mutationFn: (login) => LoginEndpoint(login),
        onSuccess: (data) => {
            console.log('✅ Login response:', { cookieSet: data.cookieSet, user: data.user })
            setAuth(data.user)
            navigate('/')
        },
        onError: (error) => {
            console.error('❌ Login error:', error.response?.data || error.message)
        }
    })

    const registerMutate = useMutation({
        mutationKey: ['register'],
        mutationFn: (register) => RegisterEndpoint(register),
        onSuccess: (data) => {
            console.log('✅ Register response:', { cookieSet: data.cookieSet, user: data.user })
            setAuth(data.user)
            navigate('/')
        },
        onError: (error) => {
            console.error('❌ Register error:', error.response?.data || error.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isLogin === true){
            loginMutate.mutate({ email: form.email, password: form.password })
        }else{
            registerMutate.mutate(form)
        }

    }

    const handleGoogleLogin = () => {
      window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`
    }

  return (
    <section className="flex justify-center items-center min-h-screen bg-[#2f3236] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] flex flex-col items-center gap-4"
      >
        <h2 className="text-white text-xl font-semibold mb-2">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-2 rounded-md text-sm font-medium hover:bg-white/90 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            required
            onChange={handleChange}
            value={form.username}
            className="auth-input"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          required
          onChange={handleChange}
          value={form.email}
          className="auth-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          onChange={handleChange}
          value={form.password}
          className="auth-input"
        />

        <button
          type="submit"
          className="w-full bg-[#123c66] text-white py-2 rounded-md text-sm font-semibold hover:bg-[#0f3254] transition"
        >
          {isLogin ? 'LOGIN' : 'REGISTER'}
        </button>

        <p className="text-white/70 text-sm mt-2">
          {isLogin ? 'Already have an account?' : 'Have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-white cursor-pointer underline hover:text-white/80"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </section>
  )
}
