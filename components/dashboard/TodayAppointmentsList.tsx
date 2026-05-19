'use client'

import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { AppointmentsListSkeleton } from '@/components/ui/LoadingSkeleton'
import { AppointmentCard } from '@/components/agenda/AppointmentCard'
import { useTodayAppointments } from '@/hooks/useAppointments'

export function TodayAppointmentsList() {
  const { data, isLoading, error, refetch } = useTodayAppointments()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Citas de hoy</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <AppointmentsListSkeleton />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} className="py-6" />
        ) : !data || data.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Sin citas hoy"
            description="No tienes citas programadas para hoy"
            className="py-6"
          />
        ) : (
          <div className="space-y-3">
            {data.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
