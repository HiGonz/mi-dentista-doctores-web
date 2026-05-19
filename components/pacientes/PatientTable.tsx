'use client'

import Link from 'next/link'
import { Phone, Eye } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PatientTableSkeleton } from '@/components/ui/LoadingSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Users } from 'lucide-react'
import type { Patient } from '@/types/patient.types'
import { formatRelativeDate, formatCurrency, cn } from '@/lib/utils'

interface PatientTableProps {
  patients: Patient[] | undefined
  isLoading: boolean
  error: Error | null
  onRetry: () => void
  className?: string
}

export function PatientTable({ patients, isLoading, error, onRetry, className }: PatientTableProps) {
  if (isLoading) return <PatientTableSkeleton />
  if (error) return <ErrorState onRetry={onRetry} />

  if (!patients || patients.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Sin pacientes"
        description="No se encontraron pacientes con los filtros seleccionados"
      />
    )
  }

  return (
    <div className={cn('rounded-xl border border-neutral-200 bg-white overflow-hidden', className)}>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Última visita</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Próxima cita</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Saldo</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar nombre={patient.nombre} apellidos={patient.apellidos} foto={patient.foto} size="sm" />
                    <div>
                      <p className="font-medium text-neutral-900">
                        {patient.nombre} {patient.apellidos}
                      </p>
                      {patient.email && <p className="text-xs text-neutral-500">{patient.email}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {patient.telefono ? (
                    <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                      <Phone className="h-3.5 w-3.5 text-neutral-400" />
                      {patient.telefono}
                    </div>
                  ) : (
                    <span className="text-sm text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {patient.ultimaVisita ? formatRelativeDate(patient.ultimaVisita) : <span className="text-neutral-400">—</span>}
                </td>
                <td className="px-6 py-4">
                  {patient.proximaCita ? (
                    <Badge variant="secondary">{formatRelativeDate(patient.proximaCita)}</Badge>
                  ) : (
                    <span className="text-sm text-neutral-400">Sin cita</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                  {formatCurrency(patient.saldo)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/pacientes/${patient.id}`} aria-label={`Ver perfil de ${patient.nombre}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-neutral-100 md:hidden">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  )
}

function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Link href={`/pacientes/${patient.id}`} className="flex items-center gap-4 px-4 py-4 hover:bg-neutral-50 transition-colors">
      <Avatar nombre={patient.nombre} apellidos={patient.apellidos} foto={patient.foto} size="md" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900 truncate">
          {patient.nombre} {patient.apellidos}
        </p>
        {patient.telefono && (
          <p className="text-xs text-neutral-500 mt-0.5">{patient.telefono}</p>
        )}
        {patient.ultimaVisita && (
          <p className="text-xs text-neutral-400 mt-0.5">Última visita: {formatRelativeDate(patient.ultimaVisita)}</p>
        )}
      </div>
      <Eye className="h-4 w-4 text-neutral-400 shrink-0" />
    </Link>
  )
}
