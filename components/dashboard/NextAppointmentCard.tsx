'use client'

import { Clock, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Avatar } from '@/components/ui/Avatar'
import { AppointmentStatusBadge } from '@/components/agenda/AppointmentStatusBadge'
import { useDashboard } from '@/hooks/useDashboard'
import { formatTime } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export function NextAppointmentCard() {
  const { data, isLoading } = useDashboard()
  const appointment = data?.proximaCita

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Próxima cita</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ) : !appointment ? (
          <EmptyState
            icon={Clock}
            title="Sin próxima cita"
            description="No tienes citas programadas próximamente"
            className="py-6"
          />
        ) : (
          <div className="flex items-start gap-4">
            <Avatar
              nombre={appointment.paciente.nombre}
              apellidos={appointment.paciente.apellidos}
              foto={appointment.paciente.foto}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-neutral-900">
                    {appointment.paciente.nombre} {appointment.paciente.apellidos}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">{appointment.motivo}</p>
                </div>
                <AppointmentStatusBadge status={appointment.status} />
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                  <Clock className="h-4 w-4 text-neutral-400" />
                  <span>{formatTime(appointment.horaInicio)} – {formatTime(appointment.horaFin)}</span>
                </div>
                {appointment.paciente.telefono && (
                  <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                    <MapPin className="h-4 w-4 text-neutral-400" />
                    <span>{appointment.paciente.telefono}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
