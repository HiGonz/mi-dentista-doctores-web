import { cn } from '@/lib/utils'
import type { AppointmentStatus } from '@/types/appointment.types'

const statusConfig: Record<AppointmentStatus, { label: string; className: string; pulse?: boolean }> = {
  programada: {
    label: 'Programada',
    className: 'bg-neutral-100 text-neutral-600 border border-neutral-300',
  },
  confirmado: {
    label: 'Confirmado',
    className: 'bg-primary-light text-primary border border-primary',
  },
  pendiente: {
    label: 'Pendiente',
    className: 'bg-accent-light text-accent border border-accent',
  },
  en_consultorio: {
    label: 'En consultorio',
    className: 'bg-primary-light text-primary border border-primary',
    pulse: true,
  },
  completada: {
    label: 'Completada',
    className: 'bg-secondary-light text-secondary-dark border border-secondary',
  },
  cancelado: {
    label: 'Cancelado',
    className: 'bg-danger-light text-danger border border-danger',
  },
}

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus
  className?: string
}

export function AppointmentStatusBadge({ status, className }: AppointmentStatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold', config.className, className)}>
      {config.pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
      )}
      {config.label}
    </span>
  )
}
