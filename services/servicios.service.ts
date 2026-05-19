import { apiClient } from './api'
import type { Servicio } from '@/types/servicio.types'

interface GetServiciosParams {
  branchId?: string | number
  search?: string
  categoryId?: number
}

export const serviciosService = {
  async getAll(params: GetServiciosParams = {}): Promise<Servicio[]> {
    const { data } = await apiClient.get<Servicio[]>('/servicios', {
      params: {
        ...(params.branchId !== undefined && { branch_id: params.branchId }),
        ...(params.search && { search: params.search }),
        ...(params.categoryId !== undefined && { category_id: params.categoryId }),
      },
    })
    return data
  },
}
