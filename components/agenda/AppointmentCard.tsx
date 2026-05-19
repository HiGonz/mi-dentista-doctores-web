'use client'

import { useState } from 'react'
import { Phone, Clock, DollarSign } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { AppointmentStatusBadge } from './AppointmentStatusBadge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { Appointment } from '@/types/appointment.types'
import { formatTime, formatCurrency, cn } from '@/lib/utils'

interface AppointmentCardProps {
  appointment: Appointment
  className?: string
}

export function AppointmentCard({ appointment, className }: AppointmentCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'w-full flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 text-left transition-all hover:border-primary hover:shadow-sm',
          className
        )}
      >
        <Avatar
          nombre={appointment.paciente.nombre}
          apellidos={appointment.paciente.apellidos}
          foto={appointment.paciente.foto}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <p className="truncate font-medium text-neutral-900">
            {appointment.paciente.nombre} {appointment.paciente.apellidos}
          </p>
          <p className="truncate text-sm text-neutral-500">{appointment.motivo}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <AppointmentStatusBadge status={appointment.status} />
          <span className="text-xs text-neutral-500">
            {formatTime(appointment.horaInicio)}
          </span>
        </div>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Detalle de cita</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-4">
              <Avatar
                nombre={appointment.paciente.nombre}
                apellidos={appointment.paciente.apellidos}
                foto={appointment.paciente.foto}
                size="lg"
              />
              <div>
                <h3 className="font-semibold text-neutral-900 text-lg">
                  {appointment.paciente.nombre} {appointment.paciente.apellidos}
                </h3>
                <AppointmentStatusBadge status={appointment.status} className="mt-1" />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
                <span className="text-neutral-600">
                  {formatTime(appointment.horaInicio)} – {formatTime(appointment.horaFin)}
                  <span className="ml-2 text-neutral-400">({appointment.duracion} min)</span>
                </span>
              </div>
              {appointment.paciente.telefono && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-neutral-400 shrink-0" />
                  <span className="text-neutral-600">{appointment.paciente.telefono}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <DollarSign className="h-4 w-4 text-neutral-400 shrink-0" />
                <span className="text-neutral-600">{formatCurrency(appointment.saldo)}</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-neutral-700">Motivo</p>
              <p className="text-sm text-neutral-600">{appointment.motivo}</p>
            </div>

            {appointment.notas && (
              <div>
                <p className="mb-2 text-sm font-medium text-neutral-700">Notas</p>
                <p className="text-sm text-neutral-600">{appointment.notas}</p>
              </div>
            )}

            {appointment.servicios.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-neutral-700">Servicios</p>
                <div className="flex flex-wrap gap-2">
                  {appointment.servicios.map((s) => (
                    <Badge key={s.id} variant="secondary">
                      {s.nombre} — {formatCurrency(s.precio)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
