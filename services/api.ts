import axios from 'axios'
import Cookies from 'js-cookie'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, LOCAL_STORAGE_USER, API_BASE_URL } from '@/constants/config'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: add Bearer token
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(COOKIE_ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: handle 401 with refresh
let isRefreshing = false
let failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: unknown) => void }> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        })
      }
      originalRequest._retry = true
      isRefreshing = true
      const refreshToken = Cookies.get(COOKIE_REFRESH_TOKEN)
      if (!refreshToken) {
        Cookies.remove(COOKIE_ACCESS_TOKEN)
        Cookies.remove(COOKIE_REFRESH_TOKEN)
        if (typeof window !== 'undefined') {
          localStorage.removeItem(LOCAL_STORAGE_USER)
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refresh_token: refreshToken })
        Cookies.set(COOKIE_ACCESS_TOKEN, data.access_token, { expires: 7 })
        apiClient.defaults.headers.common.Authorization = `Bearer ${data.access_token}`
        processQueue(null, data.access_token)
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        Cookies.remove(COOKIE_ACCESS_TOKEN)
        Cookies.remove(COOKIE_REFRESH_TOKEN)
        if (typeof window !== 'undefined') {
          localStorage.removeItem(LOCAL_STORAGE_USER)
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)
