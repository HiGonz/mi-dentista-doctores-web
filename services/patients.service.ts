import { apiClient } from './api'
import type { Patient, PatientDetail } from '@/types/patient.types'
import type { PaginatedResponse } from '@/types/api.types'

interface GetPatientsParams {
  page?: number
  limit?: number
  search?: string
}

export const patientsService = {
  async getAll(params: GetPatientsParams = {}): Promise<PaginatedResponse<Patient>> {
    const { data } = await apiClient.get<PaginatedResponse<Patient>>('/pacientes', {
      params: { page: params.page ?? 1, limit: params.limit ?? 20, search: params.search },
    })
    return data
  },

  async getById(id: string): Promise<PatientDetail> {
    const { data } = await apiClient.get<PatientDetail>(`/pacientes/${id}`)
    return data
  },
}
