'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { appointmentsService } from '@/services/appointments.service'
import type { AppointmentStatus } from '@/types/appointment.types'
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

export function useAppointmentDetail(id: string) {
  return useQuery({
    queryKey: ['appointments', id],
    queryFn: () => appointmentsService.getById(id),
    enabled: !!id,
  })
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AppointmentStatus }) =>
      appointmentsService.updateStatus(id, status),
    onSuccess: (data) => {
      queryClient.setQueryData(['appointments', data.id], data)
      queryClient.invalidateQueries({ queryKey: ['appointments', 'today'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useAddServicio() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ citaId, nombre, precio }: { citaId: string; nombre: string; precio?: number }) =>
      appointmentsService.addServicio(citaId, nombre, precio),
    onSuccess: (data) => {
      queryClient.setQueryData(['appointments', data.id], data)
    },
  })
}

export function useRemoveServicio() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ citaId, servicioId }: { citaId: string; servicioId: string }) =>
      appointmentsService.removeServicio(citaId, servicioId),
    onSuccess: (data) => {
      queryClient.setQueryData(['appointments', data.id], data)
    },
  })
}
