'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Plus, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useServicios } from '@/hooks/useServicios'
import { cn } from '@/lib/utils'
import type { Servicio } from '@/types/servicio.types'

interface ServicePickerInputProps {
  branchId?: string | number
  onSelect: (servicio: { nombre: string; precio?: number }) => void
  disabled?: boolean
  loading?: boolean
}

export function ServicePickerInput({
  branchId,
  onSelect,
  disabled,
  loading,
}: ServicePickerInputProps) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: servicios = [], isFetching } = useServicios({
    branchId,
    search,
    enabled: !disabled,
  })

  // Group by category
  const grouped = servicios.reduce<Record<string, Servicio[]>>((acc, s) => {
    const cat = s.categoria?.nombre ?? 'General'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  const hasResults = servicios.length > 0
  const showCustom = search.trim().length > 0

  function handleSelect(servicio: { nombre: string; precio?: number }) {
    onSelect(servicio)
    setSearch('')
    setOpen(false)
  }

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          <Input
            placeholder="Buscar o escribir servicio…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && showCustom && !hasResults) {
                handleSelect({ nombre: search.trim() })
              }
              if (e.key === 'Escape') setOpen(false)
            }}
            className="pl-8 text-sm"
            disabled={disabled}
          />
          {isFetching && (
            <Loader2 className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-neutral-400" />
          )}
        </div>
        {showCustom && !hasResults && (
          <Button
            size="icon"
            onClick={() => handleSelect({ nombre: search.trim() })}
            disabled={disabled || loading}
            title="Agregar como servicio personalizado"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Dropdown */}
      {open && (hasResults || showCustom) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-xl border border-neutral-200 bg-white shadow-lg">
          {hasResults ? (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {category}
                </p>
                {items.map((s) => (
                  <button
                    key={s.id}
                    onMouseDown={(e) => { e.preventDefault(); handleSelect({ nombre: s.nombre, precio: s.precio }) }}
                    className="w-full px-3 py-2.5 text-left transition-colors hover:bg-primary/5 active:bg-primary/10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium leading-snug text-neutral-800">{s.nombre}</span>
                      {typeof s.precio === 'number' && (
                        <span className="shrink-0 text-sm font-semibold text-primary">
                          ${s.precio.toLocaleString('es-MX')}
                        </span>
                      )}
                    </div>
                    {s.descripcion && s.descripcion !== s.nombre && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-neutral-400">{s.descripcion}</p>
                    )}
                  </button>
                ))}
              </div>
            ))
          ) : (
            <button
                  onMouseDown={(e) => { e.preventDefault(); handleSelect({ nombre: search.trim() }) }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50"
            >
              <Plus className="h-3.5 w-3.5 text-neutral-400" />
              Agregar &quot;{search.trim()}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  )
}
