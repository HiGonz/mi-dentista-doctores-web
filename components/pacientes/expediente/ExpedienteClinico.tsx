import { FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SignosVitalesCard } from './SignosVitalesCard'
import { AlergiasSection } from './AlergiasSection'
import { MedicamentosSection } from './MedicamentosSection'
import { FotosGallery } from './FotosGallery'
import type { ExpedienteClinico as IExpedienteClinico } from '@/types/patient.types'
import { formatDate, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface ExpedienteClinicoProps {
  expediente: IExpedienteClinico
}

export function ExpedienteClinico({ expediente }: ExpedienteClinicoProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-neutral-900">Expediente Clínico</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={expediente.status === 'activo' ? 'default' : 'secondary'}>
            {expediente.status}
          </Badge>
          <p className="text-xs text-neutral-500">
            Act. {formatDate(expediente.actualizadoEn)}
          </p>
        </div>
      </div>

      {/* Signos vitales */}
      {expediente.ultimosSignosVitales && (
        <SignosVitalesCard signosVitales={expediente.ultimosSignosVitales} />
      )}

      {/* Alergias */}
      <AlergiasSection alergias={expediente.alergias} />

      {/* Medicamentos */}
      <MedicamentosSection medicamentos={expediente.medicamentos} />

      {/* Condiciones */}
      {expediente.condiciones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Condiciones médicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expediente.condiciones.map((condicion, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-neutral-200 p-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-neutral-900">{condicion.nombre}</p>
                      <Badge variant="outline">{condicion.status}</Badge>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Diagnóstico: {formatDate(condicion.fechaDiagnostico)}
                    </p>
                    {condicion.notas && <p className="text-xs text-neutral-600 mt-1">{condicion.notas}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hábitos */}
      {expediente.habitos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hábitos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {expediente.habitos.map((habito, i) => (
                <div key={i} className="rounded-lg bg-neutral-50 p-3">
                  <p className="font-medium text-sm text-neutral-900">{habito.tipo}</p>
                  <p className="text-xs text-neutral-600 mt-0.5">{habito.descripcion}</p>
                  <p className="text-xs text-neutral-500 mt-1">{habito.frecuencia} · Desde {formatDate(habito.desde)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notas clínicas */}
      {expediente.notasClinicas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notas clínicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expediente.notasClinicas.map((nota) => (
                <div key={nota.id} className={cn(
                  'rounded-lg border p-3',
                  nota.importancia === 'alta' ? 'border-danger bg-danger-light' : 'border-neutral-200 bg-white'
                )}>
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className="min-w-0 flex-1 text-sm text-neutral-800 [&_p]:my-0.5 [&_p:empty]:hidden"
                      dangerouslySetInnerHTML={{ __html: nota.nota }}
                    />
                    <p className="text-xs text-neutral-500 shrink-0">{formatDate(nota.fecha)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fotos */}
      <FotosGallery fotos={expediente.fotos} />
    </div>
  )
}
