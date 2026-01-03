import { create } from 'zustand'

export const UserAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isInitialized: false,

    setAuth: (user) => 
        set({
            user,
            isAuthenticated: true,
            isInitialized: true,
        }),

    clearAuth: () => 
        set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
        }),
}))