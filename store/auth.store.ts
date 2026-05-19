import { create } from 'zustand'
import Cookies from 'js-cookie'
import type { Doctor } from '@/types/auth.types'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, LOCAL_STORAGE_USER } from '@/constants/config'

interface AuthState {
  user: Doctor | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: Doctor) => void
  setLoading: (loading: boolean) => void
  login: (user: Doctor, accessToken: string, refreshToken: string) => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: true }),

  setLoading: (isLoading) => set({ isLoading }),

  login: (user, accessToken, refreshToken) => {
    Cookies.set(COOKIE_ACCESS_TOKEN, accessToken, { expires: 7, secure: true, sameSite: 'strict' })
    Cookies.set(COOKIE_REFRESH_TOKEN, refreshToken, { expires: 30, secure: true, sameSite: 'strict' })
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))
    }
    set({ user, isAuthenticated: true, isLoading: false })
  },

  logout: () => {
    Cookies.remove(COOKIE_ACCESS_TOKEN)
    Cookies.remove(COOKIE_REFRESH_TOKEN)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_USER)
    }
    set({ user: null, isAuthenticated: false, isLoading: false })
  },

  hydrate: () => {
    if (typeof window === 'undefined') {
      set({ isLoading: false })
      return
    }
    const token = Cookies.get(COOKIE_ACCESS_TOKEN)
    const userStr = localStorage.getItem(LOCAL_STORAGE_USER)
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as Doctor
        set({ user, isAuthenticated: true, isLoading: false })
      } catch {
        set({ user: null, isAuthenticated: false, isLoading: false })
      }
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },
}))
