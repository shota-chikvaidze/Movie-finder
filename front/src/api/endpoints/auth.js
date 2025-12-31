import axios from '../axios'

export const LoginEndpoint = async (loginForm) => {
    const res = await axios.post('/auth/login', loginForm)
    return res.data
}

export const RegisterEndpoint = async (registerForm) => {
    const res = await axios.post('/auth/register', registerForm)
    return res.data
}

export const MeEndpoint = async () => {
    const res = await axios.get('/auth/me')
    return res.data
}

export const GoogleEndpoint = async () => {
    const res = await axios.post('/auth/google')
    return res.data
}

export const LogoutEndpoint = async () => {
    const res = await axios.post('/auth/logout')
    return res.data
}