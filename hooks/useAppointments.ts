'use client'

import { useQuery } from '@tanstack/react-query'
import { appointmentsService } from '@/services/appointments.service'
import { format } from 'date-fns'

export function useAppointments(date?: Date) {
  const dateStr = date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')

  return useQuery({
    queryKey: ['appointments', dateStr],
    queryFn: () => appointmentsService.getByDate(dateStr),
  })
}

export function useTodayAppointments() {
  return useQuery({
    queryKey: ['appointments', 'today'],
    queryFn: () => appointmentsService.getToday(),
  })
}
