import Link from 'next/link'
import { Phone, Calendar, Eye } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Patient } from '@/types/patient.types'
import { formatRelativeDate, formatCurrency } from '@/lib/utils'

interface PatientCardProps {
  patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Avatar nombre={patient.nombre} apellidos={patient.apellidos} foto={patient.foto} size="md" />
          <div>
            <p className="font-semibold text-neutral-900">
              {patient.nombre} {patient.apellidos}
            </p>
            {patient.email && <p className="text-xs text-neutral-500 mt-0.5">{patient.email}</p>}
          </div>
        </div>
        <Button asChild variant="ghost" size="icon">
          <Link href={`/pacientes/${patient.id}`} aria-label="Ver perfil">
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-neutral-600">
        {patient.telefono && (
          <div className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5 text-neutral-400" />
            {patient.telefono}
          </div>
        )}
        {patient.proximaCita && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-neutral-400" />
            <Badge variant="secondary" className="text-xs">
              {formatRelativeDate(patient.proximaCita)}
            </Badge>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
        <span className="text-xs text-neutral-500">Saldo</span>
        <span className="text-sm font-semibold text-neutral-900">{formatCurrency(patient.saldo)}</span>
      </div>
    </div>
  )
}
