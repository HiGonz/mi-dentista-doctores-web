'use client'

import { useState, useCallback } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { PatientTable } from '@/components/pacientes/PatientTable'
import { Input } from '@/components/ui/input'
import { usePatients } from '@/hooks/usePatients'
import { Search } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/button'

export default function PacientesPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, error, refetch } = usePatients({
    search: debouncedSearch,
    page,
    limit: 20,
  })

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }, [])

  const patients = data?.data
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / 20)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Pacientes"
        description={`${total} paciente${total !== 1 ? 's' : ''} registrado${total !== 1 ? 's' : ''}`}
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre, teléfono o correo..."
          className="pl-9"
        />
      </div>

      <PatientTable
        patients={patients}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
      />

      {!isLoading && !error && patients && patients.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-neutral-500">
            Página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
