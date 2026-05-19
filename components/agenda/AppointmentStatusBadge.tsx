import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/types/appointment.types";

// Map legacy Spanish API values to canonical English keys
const legacyMap: Record<string, AppointmentStatus> = {
  programada: "scheduled",
  confirmado: "confirmed",
  pendiente: "arrived",
  en_consultorio: "in_progress",
  completada: "completed",
  cancelado: "cancelled",
};

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string; pulse?: boolean }
> = {
  scheduled: {
    label: "Programada",
    className: "bg-neutral-100 text-neutral-600 border border-neutral-300",
  },
  confirmed: {
    label: "Confirmada",
    className: "bg-primary-light text-primary border border-primary",
  },
  arrived: {
    label: "En espera",
    className: "bg-accent-light text-accent border border-accent",
  },
  in_progress: {
    label: "En consulta",
    className: "bg-primary-light text-primary border border-primary",
    pulse: true,
  },
  completed: {
    label: "Completada",
    className: "bg-secondary-light text-secondary-dark border border-secondary",
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-red-50 text-danger border border-red-200",
  },
  no_show: {
    label: "No asistió",
    className: "bg-neutral-100 text-neutral-400 border border-neutral-200",
  },
};

const fallbackConfig = {
  label: "Desconocido",
  className: "bg-neutral-100 text-neutral-500 border border-neutral-200",
};

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

export function AppointmentStatusBadge({
  status,
  className,
}: AppointmentStatusBadgeProps) {
  const normalized = (legacyMap[status] ?? status) as AppointmentStatus;
  const config = statusConfig[normalized] ?? fallbackConfig;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      {config.pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
      )}
      {config.label}
    </span>
  );
}
