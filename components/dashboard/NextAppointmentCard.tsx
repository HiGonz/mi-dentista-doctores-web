"use client";

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Avatar } from "@/components/ui/Avatar";
import { AppointmentStatusBadge } from "@/components/agenda/AppointmentStatusBadge";
import { useDashboard } from "@/hooks/useDashboard";
import { formatTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function NextAppointmentCard() {
  const { data, isLoading } = useDashboard();
  const appointment = data?.proximaCita;

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-primary p-5">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-3 w-24 bg-white/20" />
          <Skeleton className="h-5 w-16 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full bg-white/20" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-36 bg-white/20" />
            <Skeleton className="h-3 w-28 bg-white/20" />
            <Skeleton className="h-3 w-20 bg-white/20" />
          </div>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400">
          Próxima cita
        </p>
        <EmptyState
          icon={Clock}
          title="Sin próxima cita"
          description="No tienes citas programadas próximamente"
          className="py-4"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-primary p-5 text-white">
      {/* Top row */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-white/60">
          Próxima cita
        </span>
        <AppointmentStatusBadge
          status={appointment.status}
          className="border-white/20 bg-white/15 text-white"
        />
      </div>

      {/* Patient info */}
      <div className="mb-5 flex items-center gap-4">
        <Avatar
          nombre={appointment.paciente.nombre}
          apellidos={appointment.paciente.apellidos}
          foto={appointment.paciente.foto}
          size="lg"
        />
        <div className="min-w-0">
          <p className="truncate text-lg font-bold leading-tight">
            {appointment.paciente.nombre} {appointment.paciente.apellidos}
          </p>
          <p className="mt-0.5 truncate text-sm text-white/70">
            {appointment.motivo}
          </p>
          <p className="mt-1 text-sm text-white/60">
            {formatTime(appointment.horaInicio)} · {appointment.duracion} min
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3">
        <AppointmentStatusBadge
          status={appointment.status}
          className="border-white/25 bg-white/10 text-white"
        />
        <Link
          href={`/agenda/${appointment.id}`}
          className="ml-auto flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25"
        >
          Ver detalles
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
