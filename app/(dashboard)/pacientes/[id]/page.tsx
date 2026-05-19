'use client'

import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExpedienteClinico } from '@/components/pacientes/expediente/ExpedienteClinico'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { usePatientDetail } from '@/hooks/usePatients'
import { formatDate, formatCurrency, formatRelativeDate } from '@/lib/utils'
import { Calendar, Phone, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: patient, isLoading, isError, refetch } = usePatientDetail(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError) {
    return <ErrorState description="No se pudo cargar el expediente del paciente" onRetry={() => refetch()} />
  }

  if (!patient) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link href="/pacientes" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Volver a pacientes
      </Link>

      {/* Patient header */}
      <div className="rounded-2xl bg-white border border-neutral-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar nombre={patient.nombre} apellidos={patient.apellidos} foto={patient.foto} size="xl" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-display font-bold text-neutral-900">
                {patient.nombre} {patient.apellidos}
              </h1>
              {patient.expedienteClinico && (
                <Badge variant={patient.expedienteClinico.status === 'activo' ? 'default' : 'secondary'}>
                  {patient.expedienteClinico.status}
                </Badge>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-600">
              {patient.telefono && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-neutral-400" />
                  {patient.telefono}
                </div>
              )}
              {patient.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-neutral-400" />
                  {patient.email}
                </div>
              )}
              {patient.fechaNacimiento && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-neutral-400" />
                  {formatDate(patient.fechaNacimiento)} — {new Date().getFullYear() - new Date(patient.fechaNacimiento).getFullYear()} años
                </div>
              )}
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-neutral-500">Saldo</p>
            <p className="text-xl font-bold text-neutral-900">{formatCurrency(patient.saldo)}</p>
            {patient.proximaCita && (
              <p className="mt-1 text-xs text-neutral-500">
                Próxima cita: <span className="text-primary">{formatRelativeDate(patient.proximaCita)}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="resumen">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="expediente">Expediente clínico</TabsTrigger>
          <TabsTrigger value="notas">Notas ({patient.notas?.length ?? 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white border border-neutral-200 p-4">
              <h3 className="font-semibold text-neutral-800 mb-3">Información personal</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Género</dt>
                  <dd className="font-medium text-neutral-800">{patient.genero ?? '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Tipo de sangre</dt>
                  <dd className="font-medium text-neutral-800">{patient.tipoSangre ?? '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Paciente desde</dt>
                  <dd className="font-medium text-neutral-800">{formatDate(patient.creadoEn)}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl bg-white border border-neutral-200 p-4">
              <h3 className="font-semibold text-neutral-800 mb-3">Contacto de emergencia</h3>
              {patient.contactoEmergencia ? (
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Nombre</dt>
                    <dd className="font-medium text-neutral-800">{patient.contactoEmergencia.nombre}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Relación</dt>
                    <dd className="font-medium text-neutral-800">{patient.contactoEmergencia.relacion}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Teléfono</dt>
                    <dd className="font-medium text-neutral-800">{patient.contactoEmergencia.telefono}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-neutral-500">No registrado</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expediente" className="mt-4">
          {patient.expedienteClinico ? (
            <ExpedienteClinico expediente={patient.expedienteClinico} />
          ) : (
            <div className="rounded-xl bg-white border border-neutral-200 p-8 text-center text-neutral-500">
              Sin expediente clínico registrado
            </div>
          )}
        </TabsContent>

        <TabsContent value="notas" className="mt-4">
          {patient.notas && patient.notas.length > 0 ? (
            <div className="space-y-3">
              {patient.notas.map((nota) => (
                <div key={nota.id} className="rounded-xl bg-white border border-neutral-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-neutral-800">{nota.nota}</p>
                    <p className="text-xs text-neutral-500 shrink-0">{formatDate(nota.fecha)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white border border-neutral-200 p-8 text-center text-neutral-500">
              Sin notas registradas
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
