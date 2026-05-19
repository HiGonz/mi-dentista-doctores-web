'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { DateStrip } from '@/components/agenda/DateStrip'
import { AppointmentCard } from '@/components/agenda/AppointmentCard'
import { AppointmentsListSkeleton } from '@/components/ui/LoadingSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { useAppointments } from '@/hooks/useAppointments'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, Filter } from 'lucide-react'
import type { AppointmentStatus } from '@/types/appointment.types'

const STATUS_FILTERS: { label: string; value: AppointmentStatus | 'todos' }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Confirmados', value: 'confirmed' },
  { label: 'En consultorio', value: 'in_progress' },
  { label: 'En espera', value: 'arrived' },
  { label: 'Cancelados', value: 'cancelled' },
]

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'todos'>('todos')

  const { data: appointments, isLoading, isError, refetch } = useAppointments(selectedDate)

  const filtered = statusFilter === 'todos'
    ? (appointments ?? [])
    : (appointments ?? []).filter((a) => a.status === statusFilter)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Agenda"
        description={format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
      />

      <DateStrip selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {/* Status filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <Filter className="h-4 w-4 text-neutral-400 shrink-0" />
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === f.value
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {isLoading && <AppointmentsListSkeleton />}
      {isError && <ErrorState description="No se pudo cargar la agenda" onRetry={() => refetch()} />}
      {!isLoading && !isError && filtered.length === 0 && (
        <EmptyState
          icon={Calendar}
          title="Sin citas"
          description="No hay citas programadas para este día."
        />
      )}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  )
}
