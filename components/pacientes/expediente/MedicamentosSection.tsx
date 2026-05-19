import { Pill } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Medicamento } from '@/types/patient.types'
import { formatDate } from '@/lib/utils'

interface MedicamentosSectionProps {
  medicamentos: Medicamento[]
}

export function MedicamentosSection({ medicamentos }: MedicamentosSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Pill className="h-4 w-4 text-primary" />
          Medicamentos ({medicamentos.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {medicamentos.length === 0 ? (
          <EmptyState title="Sin medicamentos registrados" className="py-4" />
        ) : (
          <div className="space-y-3">
            {medicamentos.map((med, i) => (
              <div key={i} className="rounded-lg border border-neutral-200 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-neutral-900">{med.nombre}</p>
                    <p className="text-sm text-neutral-600 mt-0.5">{med.dosis} — {med.frecuencia}</p>
                  </div>
                  <div className="text-right text-xs text-neutral-500 shrink-0">
                    <p>Inicio: {formatDate(med.inicio)}</p>
                    {med.fin && <p>Fin: {formatDate(med.fin)}</p>}
                  </div>
                </div>
                {med.notas && <p className="text-xs text-neutral-500 mt-2 border-t border-neutral-100 pt-2">{med.notas}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
