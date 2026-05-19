'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/EmptyState'
import type { FotoClinica } from '@/types/patient.types'
import { formatDate } from '@/lib/utils'

interface FotosGalleryProps {
  fotos: FotoClinica[]
}

export function FotosGallery({ fotos }: FotosGalleryProps) {
  const [selectedFoto, setSelectedFoto] = useState<FotoClinica | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          Fotografías clínicas ({fotos.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {fotos.length === 0 ? (
          <EmptyState title="Sin fotografías registradas" className="py-4" />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {fotos.map((foto) => (
              <button
                key={foto.id}
                onClick={() => setSelectedFoto(foto)}
                className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
              >
                <Image
                  src={foto.url}
                  alt={foto.categoria}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
                  <p className="text-xs text-white font-medium truncate">{foto.categoria}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>

      {/* Lightbox */}
      {selectedFoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedFoto(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedFoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-neutral-300 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={selectedFoto.url}
                alt={selectedFoto.categoria}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Badge variant="secondary">{selectedFoto.categoria}</Badge>
              <p className="text-sm text-white/70">{formatDate(selectedFoto.fecha)}</p>
            </div>
            {selectedFoto.notas && (
              <p className="mt-2 text-sm text-white/80">{selectedFoto.notas}</p>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
