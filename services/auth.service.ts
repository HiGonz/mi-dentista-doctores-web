import { apiClient } from './api'
import type { AuthResponse, LoginCredentials, Doctor } from '@/types/auth.types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async me(): Promise<Doctor> {
    const { data } = await apiClient.get<Doctor>('/auth/me')
    return data
  },

  async refresh(refreshToken: string): Promise<{ access_token: string }> {
    const { data } = await apiClient.post<{ access_token: string }>('/auth/refresh', {
      refresh_token: refreshToken,
    })
    return data
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>('/auth/forgot-password', { email })
    return data
  },
}
