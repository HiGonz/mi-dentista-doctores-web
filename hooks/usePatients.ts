'use client'

import { useQuery } from '@tanstack/react-query'
import { patientsService } from '@/services/patients.service'

interface UsePatientsParams {
  page?: number
  limit?: number
  search?: string
}

export function usePatients(params: UsePatientsParams = {}) {
  return useQuery({
    queryKey: ['patients', params.page, params.limit, params.search],
    queryFn: () => patientsService.getAll(params),
  })
}

export function usePatientDetail(id: string) {
  return useQuery({
    queryKey: ['patients', id],
    queryFn: () => patientsService.getById(id),
    enabled: !!id,
  })
}
