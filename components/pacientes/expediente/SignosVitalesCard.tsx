import { Activity, Heart, Droplets, Weight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SignosVitales } from '@/types/patient.types'
import { formatDate } from '@/lib/utils'

interface SignosVitalesCardProps {
  signosVitales: SignosVitales
}

const vitals = [
  { key: 'presionArterial' as const, label: 'Presión arterial', icon: Activity, unit: 'mmHg' },
  { key: 'frecuenciaCardiaca' as const, label: 'Frec. cardiaca', icon: Heart, unit: 'bpm' },
  { key: 'glucosa' as const, label: 'Glucosa', icon: Droplets, unit: 'mg/dL' },
  { key: 'peso' as const, label: 'Peso', icon: Weight, unit: 'kg' },
]

export function SignosVitalesCard({ signosVitales }: SignosVitalesCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Signos vitales</CardTitle>
          <p className="text-xs text-neutral-500">
            {formatDate(signosVitales.registradoEn, "d MMM yyyy, HH:mm")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {vitals.map(({ key, label, icon: Icon, unit }) => (
            <div key={key} className="flex flex-col items-center rounded-lg bg-neutral-50 p-3 text-center">
              <Icon className="h-5 w-5 text-primary mb-1" />
              <p className="text-lg font-bold text-neutral-900">{signosVitales[key]}</p>
              <p className="text-xs text-neutral-500">{unit}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
