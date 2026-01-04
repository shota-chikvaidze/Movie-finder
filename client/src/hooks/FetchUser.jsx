import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MeEndpoint } from '../api/endpoint/auth'
import { UserAuthStore } from '../store/UserAuthStore'

export const FetchMe = () => {
    const setAuth = UserAuthStore(s => s.setAuth)
    const clearAuth = UserAuthStore(s => s.clearAuth)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: () => MeEndpoint(),
        retry: false,
    })  

    useEffect(() => {
        if(data?.user) {
            console.log('✅ User fetched:', data.user)
            setAuth(data.user)
        } 
    
        if(isError) {
            console.error('❌ Failed to fetch user:', error?.response?.data || error?.message)
            clearAuth()
        }
    
    },  [data, isError, error, setAuth, clearAuth]) 
    return { isLoading }
}
