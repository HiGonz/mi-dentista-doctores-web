"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { AppointmentsListSkeleton } from "@/components/ui/LoadingSkeleton";
import { AppointmentStatusBadge } from "@/components/agenda/AppointmentStatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { useTodayAppointments } from "@/hooks/useAppointments";
import { formatTime } from "@/lib/utils";

export function TodayAppointmentsList() {
  const { data, isLoading, error, refetch } = useTodayAppointments();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-neutral-900">
          Citas de Hoy
        </h2>
        <Link
          href="/agenda"
          className="text-sm font-medium text-primary hover:underline"
        >
          Ver todas
        </Link>
      </div>

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
        <div className="space-y-2">
          {data.map((appointment) => (
            <Link
              key={appointment.id}
              href={`/agenda/${appointment.id}`}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:border-primary hover:bg-neutral-50"
            >
              <Avatar
                nombre={appointment.paciente.nombre}
                apellidos={appointment.paciente.apellidos}
                foto={appointment.paciente.foto}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  {appointment.paciente.nombre} {appointment.paciente.apellidos}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  {appointment.motivo}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-xs font-medium text-neutral-700">
                  {formatTime(appointment.horaInicio)}
                </span>
                <AppointmentStatusBadge status={appointment.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
