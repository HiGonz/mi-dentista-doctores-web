import { apiClient } from './api'
import type { Appointment } from '@/types/appointment.types'

export const appointmentsService = {
  async getByDate(fecha: string): Promise<Appointment[]> {
    const { data } = await apiClient.get<Appointment[]>('/citas', { params: { fecha } })
    return data
  },

  async getToday(): Promise<Appointment[]> {
    const { data } = await apiClient.get<Appointment[]>('/citas/hoy')
    return data
  },
}
