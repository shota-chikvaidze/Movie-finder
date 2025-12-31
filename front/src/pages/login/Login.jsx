import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { GoogleEndpoint, LoginEndpoint, RegisterEndpoint } from '../../api/endpoints/auth'
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
            setAuth(data.user)
            navigate('/')
        }
    })

    const registerMutate = useMutation({
        mutationKey: ['register'],
        mutationFn: (register) => RegisterEndpoint(register),
        onSuccess: (data) => {
            setAuth(data.user)
            navigate('/')
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

  return (
    <div>

        <form onSubmit={handleSubmit}>

            {!isLogin && (
                <input type='text' name='username' placeholder='Enter username' required onChange={handleChange} value={form.username} />
            )}

            <input type='email' name='email' placeholder='Enter email' required onChange={handleChange} value={form.email} />
            <input type='password' name='password' placeholder='Enter password' required onChange={handleChange} value={form.password} />

            
            <button type='submit'> { isLogin ? 'Login' : 'Register' } </button>
            
            {isLogin ? (
                <p> Dont have an account? <button type='button' onClick={() => setIsLogin(false)} className='hover:underline cursor-pointer'> Register </button> </p>
            ) : (
                <p> Have an account? <button type='button' onClick={() => setIsLogin(true)} className='hover:underline cursor-pointer'> Login </button> </p>
            )}



        </form>
        
    </div>
  )
}
