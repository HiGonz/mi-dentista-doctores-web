import { apiClient } from './api'
import type { DashboardStats } from '@/types/api.types'

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get<DashboardStats>('/dashboard/stats')
    return data
  },
}
