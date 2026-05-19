import { apiClient } from './api'
import type { Appointment, AppointmentStatus } from '@/types/appointment.types'

export const appointmentsService = {
  async getByDate(fecha: string): Promise<Appointment[]> {
    const { data } = await apiClient.get<Appointment[]>('/citas', { params: { fecha } })
    return data
  },

  async getToday(): Promise<Appointment[]> {
    const { data } = await apiClient.get<Appointment[]>('/citas/hoy')
    return data
  },

  async getById(id: string): Promise<Appointment> {
    const { data } = await apiClient.get<Appointment>(`/citas/${id}`)
    return data
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    const { data } = await apiClient.patch<Appointment>(`/citas/${id}/status`, { status })
    return data
  },

  async addServicio(citaId: string, nombre: string, precio = 0): Promise<Appointment> {
    const { data } = await apiClient.post<Appointment>(`/citas/${citaId}/servicios`, { nombre, precio })
    return data
  },

  async removeServicio(citaId: string, servicioId: string): Promise<Appointment> {
    const { data } = await apiClient.delete<Appointment>(`/citas/${citaId}/servicios/${servicioId}`)
    return data
  },
}
