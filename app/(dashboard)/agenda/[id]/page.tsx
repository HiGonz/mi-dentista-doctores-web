'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Trash2,
  FileText,
  AlertTriangle,
  Pill,
  StickyNote,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { AppointmentStatusBadge } from '@/components/agenda/AppointmentStatusBadge'
import { ServicePickerInput } from '@/components/agenda/ServicePickerInput'
import { FotosGallery } from '@/components/pacientes/expediente/FotosGallery'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/button'
import {
  useAppointmentDetail,
  useUpdateAppointmentStatus,
  useAddServicio,
  useRemoveServicio,
} from '@/hooks/useAppointments'
import { usePatientDetail } from '@/hooks/usePatients'
import { useAuthStore } from '@/store/auth.store'
import { formatTime, formatDate, cn } from '@/lib/utils'
import type { AppointmentStatus } from '@/types/appointment.types'

const CAN_START: AppointmentStatus[] = ['scheduled', 'confirmed', 'arrived']

export default function AppointmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthStore()
  const branchId = user?.clinica?.id

  const { data: appointment, isLoading, isError, refetch } = useAppointmentDetail(id)
  const { data: patient } = usePatientDetail(appointment?.paciente.id ?? '')

  const updateStatus = useUpdateAppointmentStatus()
  const addServicio = useAddServicio()
  const removeServicio = useRemoveServicio()

  if (isLoading) return <AppointmentDetailSkeleton />
  if (isError) return <ErrorState description="No se pudo cargar la cita" onRetry={() => refetch()} />
  if (!appointment) { notFound() }

  const status = appointment.status
  const isInProgress = status === 'in_progress'
  const isDone = status === 'completed' || status === 'cancelled' || status === 'no_show'
  const canAddServices = isInProgress
  const expediente = patient?.expedienteClinico

  function handleStart() {
    updateStatus.mutate({ id, status: 'in_progress' })
  }

  function handleComplete() {
    updateStatus.mutate({ id, status: 'completed' })
  }

  function handleAddServicio({ nombre, precio }: { nombre: string; precio?: number }) {
    addServicio.mutate({ citaId: id, nombre, precio })
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/agenda"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a agenda
      </Link>

      {/* Patient header card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center gap-4">
          <Avatar
            nombre={appointment.paciente.nombre}
            apellidos={appointment.paciente.apellidos}
            foto={appointment.paciente.foto}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-neutral-900">
              {appointment.paciente.nombre} {appointment.paciente.apellidos}
            </p>
            <p className="mt-0.5 truncate text-sm text-neutral-500">{appointment.motivo}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span>{formatDate(appointment.fecha, "EEEE d 'de' MMMM")}</span>
              <span>·</span>
              <span>{formatTime(appointment.horaInicio)} – {formatTime(appointment.horaFin)}</span>
              <span>·</span>
              <span>{appointment.duracion} min</span>
            </div>
          </div>
          <AppointmentStatusBadge status={status} className="shrink-0" />
        </div>

        {/* Status actions */}
        {!isDone && (
          <div className="mt-4 border-t border-neutral-100 pt-4">
            {CAN_START.includes(status) && (
              <Button
                className="w-full gap-2"
                onClick={handleStart}
                disabled={updateStatus.isPending}
              >
                <Play className="h-4 w-4" />
                Iniciar consulta
              </Button>
            )}
            {isInProgress && (
              <Button
                className="w-full gap-2 bg-secondary hover:bg-secondary-dark"
                onClick={handleComplete}
                disabled={updateStatus.isPending}
              >
                <CheckCircle2 className="h-4 w-4" />
                Marcar como completada
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="consulta">
        <TabsList className="w-full">
          <TabsTrigger value="consulta" className="flex-1">Consulta</TabsTrigger>
          <TabsTrigger value="paciente" className="flex-1">Paciente</TabsTrigger>
        </TabsList>

        {/* ── CONSULTA TAB ── */}
        <TabsContent value="consulta" className="mt-4 space-y-4">
          {/* Notas */}
          {appointment.notas && (
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Notas de la cita
              </p>
              <p className="text-sm text-neutral-700">{appointment.notas}</p>
            </div>
          )}

          {/* Services */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Servicios realizados
            </p>

            {appointment.servicios.length === 0 ? (
              <p className="py-2 text-center text-sm text-neutral-400">
                {canAddServices ? 'Agrega los servicios realizados' : 'Sin servicios registrados'}
              </p>
            ) : (
              <>
                <ul className="mb-3 space-y-2">
                  {appointment.servicios.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 flex-1 font-medium text-neutral-800">{s.nombre}</span>
                      <div className="ml-2 flex shrink-0 items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-700">
                          ${(s.precio ?? 0).toLocaleString('es-MX')}
                        </span>
                        {canAddServices && (
                          <button
                            onClick={() => removeServicio.mutate({ citaId: id, servicioId: s.id })}
                            disabled={removeServicio.isPending}
                            className="rounded p-1 text-neutral-400 transition-colors hover:bg-red-50 hover:text-danger"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-neutral-100 pt-2.5">
                  <span className="text-sm font-semibold text-neutral-500">Total</span>
                  <span className="text-base font-bold text-neutral-900">
                    ${appointment.servicios
                      .reduce((sum, s) => sum + (s.precio ?? 0), 0)
                      .toLocaleString('es-MX')}
                  </span>
                </div>
              </>
            )}

            {canAddServices && (
              <ServicePickerInput
                branchId={branchId}
                onSelect={handleAddServicio}
                disabled={addServicio.isPending}
                loading={addServicio.isPending}
              />
            )}

            {isDone && (
              <p className="mt-2 text-center text-xs text-neutral-400">
                La consulta está cerrada — no se pueden agregar más servicios
              </p>
            )}
          </div>
        </TabsContent>

        {/* ── PACIENTE TAB ── */}
        <TabsContent value="paciente" className="mt-4 space-y-4">
          {/* Patient notes */}
          {patient?.notas && patient.notas.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <StickyNote className="h-4 w-4 text-accent" />
                <p className="text-sm font-semibold text-neutral-900">Notas del paciente</p>
              </div>
              <ul className="space-y-2">
                {patient.notas.map((nota) => (
                  <li
                    key={nota.id}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-sm',
                      nota.importancia === 'alta'
                        ? 'border-red-200 bg-red-50 text-danger'
                        : nota.importancia === 'media'
                          ? 'border-accent/30 bg-accent-light text-neutral-800'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    )}
                  >
                    {nota.nota}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Allergies */}
          {expediente && expediente.alergias.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-danger" />
                <p className="text-sm font-semibold text-neutral-900">
                  Alergias ({expediente.alergias.length})
                </p>
              </div>
              <ul className="space-y-2">
                {expediente.alergias.map((a, i) => (
                  <li key={i} className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm">
                    <span className="font-medium text-danger">{a.sustancia}</span>
                    <span className="ml-2 text-neutral-600">— {a.reaccion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medications */}
          {expediente && expediente.medicamentos.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <Pill className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-neutral-900">
                  Medicamentos ({expediente.medicamentos.length})
                </p>
              </div>
              <ul className="space-y-2">
                {expediente.medicamentos.map((m, i) => (
                  <li key={i} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm">
                    <span className="font-medium text-neutral-900">{m.nombre}</span>
                    <span className="ml-2 text-neutral-500">{m.dosis} · {m.frecuencia}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clinical notes */}
          {expediente && expediente.notasClinicas.length > 0 && (
            <div className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-neutral-500" />
                <p className="text-sm font-semibold text-neutral-900">Notas clínicas</p>
              </div>
              <ul className="space-y-2">
                {expediente.notasClinicas.slice(0, 5).map((nota) => (
                  <li key={nota.id} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2">
                    <div
                      className="text-sm text-neutral-700 [&_p]:my-0.5 [&_p:empty]:hidden"
                      dangerouslySetInnerHTML={{ __html: nota.nota }}
                    />
                    <p className="mt-1 text-xs text-neutral-400">{formatDate(nota.fecha)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!patient?.notas?.length && !expediente?.alergias?.length &&
            !expediente?.medicamentos?.length && !expediente?.notasClinicas?.length && (
            <EmptyState
              icon={FileText}
              title="Sin información clínica"
              description="Este paciente no tiene notas ni expediente registrado"
              className="py-8"
            />
          )}

          {/* Fotos clínicas */}
          {expediente && expediente.fotos.length > 0 && (
            <FotosGallery fotos={expediente.fotos} />
          )}

          <Link
            href={`/pacientes/${appointment.paciente.id}`}
            className="block text-center text-sm font-medium text-primary hover:underline"
          >
            Ver expediente completo →
          </Link>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AppointmentDetailSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-4 w-28" />
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <Skeleton className="mt-4 h-10 w-full rounded-xl" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  )
}
