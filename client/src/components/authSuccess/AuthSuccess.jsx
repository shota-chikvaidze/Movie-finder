import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuthStore } from '../../store/UserAuthStore'
import { MeEndpoint } from '../../api/endpoint/auth'
import { useQuery } from '@tanstack/react-query'

export const AuthSuccess = () => {
  const setAuth = UserAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['success'],
    queryFn: () => MeEndpoint(),
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 500,
  })

  useEffect(() => {
    if (isSuccess && data?.user) {
      setAuth(data.user)
      navigate('/')
    }
  }, [isSuccess, data, setAuth, navigate])

  useEffect(() => {
    if (isError) {
      console.error('Auth failed, redirecting to login')
      navigate('/login')
    }
  }, [isError, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Signing you in...
    </div>
  )
}
