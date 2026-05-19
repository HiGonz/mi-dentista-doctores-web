'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service'
import type { LoginCredentials } from '@/types/auth.types'

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout: storeLogout } = useAuthStore()
  const router = useRouter()

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials)
      login(response.user, response.access_token, response.refresh_token)
      router.push('/dashboard')
    },
    [login, router]
  )

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // Ignore logout errors
    } finally {
      storeLogout()
      router.push('/login')
    }
  }, [storeLogout, router])

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  }
}
