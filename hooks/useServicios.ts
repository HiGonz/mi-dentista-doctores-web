'use client'

import { useQuery } from '@tanstack/react-query'
import { serviciosService } from '@/services/servicios.service'
import { useDebounce } from './useDebounce'

interface UseServiciosParams {
  branchId?: string | number
  search?: string
  categoryId?: number
  enabled?: boolean
}

export function useServicios({ branchId, search, categoryId, enabled = true }: UseServiciosParams = {}) {
  const debouncedSearch = useDebounce(search ?? '', 300)

  return useQuery({
    queryKey: ['servicios', branchId, debouncedSearch, categoryId],
    queryFn: () =>
      serviciosService.getAll({ branchId, search: debouncedSearch || undefined, categoryId }),
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
  })
}
