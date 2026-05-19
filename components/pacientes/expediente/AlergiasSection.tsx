import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Alergia } from '@/types/patient.types'
import { cn } from '@/lib/utils'

const severidadVariant: Record<string, string> = {
  alta: 'bg-danger-light text-danger border-danger',
  media: 'bg-accent-light text-accent border-accent',
  baja: 'bg-secondary-light text-secondary-dark border-secondary',
}

interface AlergiasSectionProps {
  alergias: Alergia[]
}

export function AlergiasSection({ alergias }: AlergiasSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-accent" />
          Alergias ({alergias.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alergias.length === 0 ? (
          <EmptyState title="Sin alergias registradas" className="py-4" />
        ) : (
          <div className="space-y-3">
            {alergias.map((alergia, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-neutral-200 p-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-neutral-900">{alergia.sustancia}</p>
                    <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold', severidadVariant[alergia.severidad.toLowerCase()] ?? severidadVariant.media)}>
                      {alergia.severidad}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">{alergia.reaccion}</p>
                  {alergia.notas && <p className="text-xs text-neutral-500 mt-1">{alergia.notas}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
