'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/EmptyState'
import type { FotoClinica } from '@/types/patient.types'
import { formatDate } from '@/lib/utils'

const CATEGORY_LABELS: Record<string, string> = {
  EXTRAORAL: 'Extraoral',
  INTRAORAL: 'Intraoral',
  RADIOGRAPH: 'Radiografía',
  TREATMENT_PROGRESS: 'Progreso de tratamiento',
  OTHER: 'Otras',
}

interface FotosGalleryProps {
  fotos: FotoClinica[]
}

export function FotosGallery({ fotos }: FotosGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedFoto = selectedIndex !== null ? fotos[selectedIndex] : null

  function prev() {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + fotos.length) % fotos.length)
  }

  function next() {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % fotos.length)
  }

  // Group by category preserving original flat index for lightbox navigation
  const grouped = fotos.reduce<Record<string, { foto: FotoClinica; index: number }[]>>(
    (acc, foto, index) => {
      const cat = foto.categoria ?? 'OTHER'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push({ foto, index })
      return acc
    },
    {}
  )

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-4 w-4 text-primary" />
            Fotografías clínicas ({fotos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fotos.length === 0 ? (
            <EmptyState title="Sin fotografías registradas" className="py-4" />
          ) : (
            <div className="space-y-5">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {CATEGORY_LABELS[cat] ?? cat} ({items.length})
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {items.map(({ foto, index }) => (
                      <button
                        key={foto.id}
                        onClick={() => setSelectedIndex(index)}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
                      >
                        <Image
                          src={foto.url}
                          alt={CATEGORY_LABELS[foto.categoria] ?? foto.categoria}
                          fill
                          sizes="(max-width: 640px) 33vw, 25vw"
                          className="object-cover transition-transform group-hover:scale-105"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                        {foto.notas && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-1.5">
                            <p className="truncate text-[10px] text-white">{foto.notas}</p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lightbox */}
      {selectedFoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-10 right-0 text-white/70 transition-colors hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={selectedFoto.url}
                alt={CATEGORY_LABELS[selectedFoto.categoria] ?? selectedFoto.categoria}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Nav arrows */}
            {fotos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/70"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/70"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Meta */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {CATEGORY_LABELS[selectedFoto.categoria] ?? selectedFoto.categoria}
                </Badge>
                {selectedFoto.notas && (
                  <p className="text-sm text-white/70">{selectedFoto.notas}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                {selectedFoto.fecha && (
                  <span>{formatDate(selectedFoto.fecha)}</span>
                )}
                {fotos.length > 1 && (
                  <span>{(selectedIndex ?? 0) + 1} / {fotos.length}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
